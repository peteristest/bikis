import React, { Component, PropTypes } from 'react'
import SimpleMarkdown from 'simple-markdown'
import classNames from 'classnames'
import Tappable from 'react-tappable'
import R from 'ramda'

import assignToEmpty from './../../utils/assign'
import Toggle from './../Toggle'
import DistortedTextContainer from './../../containers/DistortedTextContainer'

class Bio extends Component {
  render () {
    const {className = '', content, handleToggle, handleRelease, handleOffset, dragging, activeToggle} = this.props
    const toggleProps = {handleToggle, handleRelease, handleOffset}

    const isToggleDisabled = (url) => (dragging && activeToggle && url !== activeToggle)
    const isToggleActive = (url) => (url === activeToggle)

    const rules = getRules(isToggleDisabled, isToggleActive, toggleProps)
    const reactContent = parseMarkdown(content, rules)

    const coverClassName = classNames('bio-cover transition-opacity fixed top-0 left-0 right-0', {
      'no-pointer-events': activeToggle === '/'
    })

    return (
      <div className={classNames('lh3 mt0 h1', className)}>
        {reactContent}
        <div className='absolute top-0 left-0 right-0 bottom-0 no-pointer-events' style={{zIndex: 11}}>
          {this.props.children}
        </div>
        <Tappable className={coverClassName} onTap={() => handleToggle(false)} />
      </div>
    )
  }
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

/* Helpers */

const { defaultRules } = SimpleMarkdown

const getRules = (isToggleDisabled, isToggleActive, toggleProps) => (
  assignToEmpty(defaultRules, {
    em: assignToEmpty(defaultRules.em, {
      match: (source) => /^\*([\s\S]+?)\*/.exec(source),
      react: (node, recurseOutput) => <span>{recurseOutput(node.content)}</span>
    }),
    link: assignToEmpty(defaultRules.link, {
      react: (node, output, state) => {
        const label = R.head(output(node.content, state))
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
        <DistortedTextContainer
          id='name'
          className='large-text text-pb block center right no-pointer-events'
          turbulence={0.005}
          animated={false}
          content={R.head(output(node.content, state)).replace(' ', '<br />')} />
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

export default Bio
