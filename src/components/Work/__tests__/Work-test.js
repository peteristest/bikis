import React from 'react'
import { shallow } from 'enzyme'

jest.unmock('./../')
import Work from './../'

describe('<Work />', function () {
  it('should render correct number of projects', () => {
    const numItems = 10
    const items = Array(numItems).fill('Work')
    const wrapper = shallow(
      <Work projects={items} />
    )
    expect(wrapper.find('.h4 > span').length).toEqual(numItems)
  })

  it('should use its className', () => {
    const test = 'test'
    const wrapper = shallow(
      <Work className={test} />
    )
    expect(wrapper.hasClass(test)).toEqual(true)
  })
})
