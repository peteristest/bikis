import React, { PropTypes } from 'react'
import SimpleMarkdown from 'simple-markdown'
import classNames from 'classnames'

import assignToEmpty from './../../utils/assign'
import Toggle from './../Toggle'
import DistortedText from './../DistortedText'

const { defaultRules } = SimpleMarkdown

const getRules = (isToggleDisabled, isToggleActive, toggleProps) => (
  assignToEmpty(defaultRules, {
    em: assignToEmpty(defaultRules.em, {
      match: (source) => /^\*([\s\S]+?)\*/.exec(source),
      react: (node, recurseOutput) => <span>{recurseOutput(node.content)}</span>
    }),
    link: assignToEmpty(defaultRules.link, {
      react: (node, output, state) => {
        const label = output(node.content, state)[0]
        const url = node.target

        return (
          <Toggle
            label={label}
            url={url}
            active={isToggleActive(url)}
            disabled={isToggleDisabled(url)}
            {...toggleProps} />
        )
      }
    }),
    u: assignToEmpty(defaultRules.u, {
      react: (node, output, state) => (
        <DistortedText
          id={`name${Math.random() * 100 << 0}`}
          className='large-text text-pb block center right'
          turbulence={0.005}
          animated={false}
          content={output(node.content, state)[0].replace(' ', '<br />')} />
      )
    })
  })
)

const parseMarkdown = (src, rules) => {
  const parser = SimpleMarkdown.parserFor(rules)
  const reactOutput = SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, 'react'))
  const parseTree = parser(src + '\n\n', {inline: true})

  return reactOutput(parseTree)
}

const Bio = (props) => {
  const {className = '', content, handleToggle, handleRelease, handleOffset, dragging, activeToggle} = props
  const toggleProps = {handleToggle, handleRelease, handleOffset}

  const isToggleDisabled = (url) => (dragging && activeToggle && url !== activeToggle)
  const isToggleActive = (url) => (url === activeToggle)

  const rules = getRules(isToggleDisabled, isToggleActive, toggleProps)
  const reactContent = parseMarkdown(content, rules)

  return (
    <div className={classNames('lh3 mt0 h1', className)}>
      {reactContent}
      <div className='absolute top-0 left-0 right-0 bottom-0 no-pointer-events' style={{zIndex: 11}}>
        {props.children}
      </div>
      <div className='bio-cover transition-opacity fixed top-0 left-0 right-0 no-pointer-events' />
    </div>
  )
}

Bio.propTypes = {
  className: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  handleRelease: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleOffset: PropTypes.func.isRequired,
  activeToggle: PropTypes.string,
  dragging: PropTypes.bool
}

export default Bio
