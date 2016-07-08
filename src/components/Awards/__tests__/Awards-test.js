import React from 'react'
import { shallow } from 'enzyme'

jest.unmock('./../')
import Awards from './../'

const format = require('./../../../utils/format')
format.slantedText = jest.fn()

describe('<Awards />', function () {
  it('should render correct number of awards', () => {
    const numItems = 10
    const items = Array(numItems).fill('Award')
    const wrapper = shallow(
      <Awards awards={items} />
    )
    expect(wrapper.find('.h4 > span').length).toEqual(numItems)
  })

  it('should use its className', () => {
    const wrapper = shallow(
      <Awards className={'test'} />
    )
    expect(wrapper.hasClass('test')).toEqual(true)
  })
})
