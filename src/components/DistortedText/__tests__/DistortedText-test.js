import React from 'react'
import { shallow, mount } from 'enzyme'

jest.unmock('./../')
import DistortedText from './../'

const mockProps = {
  id: 'id',
  location: ''
}

describe('<DistortedText />', function () {
  it('should render its text content', () => {
    const text = 'distorted text'
    const wrapper = mount(
      <DistortedText content='distorted text' {...mockProps} />
    )
    expect(wrapper.find('.distort-text').text()).toEqual(text)
  })

  it('should use its className', () => {
    const test = 'test'
    const wrapper = shallow(
      <DistortedText className={test} content='distorted text' {...mockProps} />
    )
    expect(wrapper.find('> span').hasClass(test)).toEqual(true)
  })

  it('should animate on rollover with \'animated\' enabled', () => {
    const test = 'test'
    const wrapper = mount(
      <DistortedText className={test} content='distorted text' animated {...mockProps} />
    )

    wrapper.find('> span').simulate('mouseenter')
    expect(wrapper.state('animate')).toEqual(true)
  })

  it('should not animate on rollover with \'animated\' disabled', () => {
    const test = 'test'
    const wrapper = mount(
      <DistortedText className={test} content='distorted text' animated={false} {...mockProps} />
    )

    wrapper.find('> span').simulate('mouseenter')
    expect(wrapper.state('animate')).toEqual(false)
  })
})
