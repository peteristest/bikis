import React from 'react'
import { shallow } from 'enzyme'

jest.unmock('./../')
import Bio from './../'

const mockProps = {
  content: '',
  handleRelease: () => {},
  handleToggle: () => {},
  handleOffset: () => {}
}

describe('<Bio />', function () {
  it('should render its children', () => {
    const children = (<div className='Bio-child' />)
    const wrapper = shallow(
      <Bio {...mockProps}>
        {children}
      </Bio>
    )
    expect(wrapper.contains(children)).toBe(true)
  })

  it('should use its className', () => {
    const test = 'test'
    const wrapper = shallow(
      <Bio className={test} {...mockProps} />
    )
    expect(wrapper.hasClass(test)).toEqual(true)
  })
})
