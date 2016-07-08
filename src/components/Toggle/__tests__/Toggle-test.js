import React from 'react'
import { shallow, mount, render } from 'enzyme'

jest.unmock('./../index')
import Toggle from './../index'

describe('<Toggle />', function () {
  it('should render its text content', () => {
    const text = 'Label'
    const wrapper = render(
      <Toggle label={text} url={'/test'} />
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('should render a link for external URLs', () => {
    const url = 'http://external.com'
    const wrapper = shallow(
      <Toggle label={'Label'} url={url} />
    )
    expect(wrapper.type()).toEqual('a')
  })

  it('should handle toggle callback on hover', () => {
    const handleToggle = jest.fn()
    const wrapper = mount(
      <Toggle url={'/test'} label={'test'} handleToggle={handleToggle} />
    )
    wrapper.simulate('mouseenter')
    expect(handleToggle).toBeCalled()
  })
})
