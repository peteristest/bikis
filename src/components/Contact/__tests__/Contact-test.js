import React from 'react'
import { shallow } from 'enzyme'

jest.unmock('./../')
import Contact from './../'

const format = require('./../../../utils/format')
format.verticalText = jest.fn()

describe('<Contact />', function () {
  it('should render its children', () => {
    const children = (<div className='contact-child' />)
    const wrapper = shallow(
      <Contact>
        {children}
      </Contact>
    )
    expect(wrapper.contains(children)).toBe(true)
  })

  it('should use its className', () => {
    const test = 'test'
    const wrapper = shallow(
      <Contact className={test} />
    )
    expect(wrapper.hasClass(test)).toEqual(true)
  })
})
