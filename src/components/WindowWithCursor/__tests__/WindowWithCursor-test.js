import React from 'react'
import { shallow, mount } from 'enzyme'

jest.unmock('./../index')
import WindowWithCursor from './../index'

describe('<WindowWithCursor />', function () {
  it('should render its children', () => {
    const children = (<div className='window-with-cursor-child' />)
    const wrapper = shallow(
      <WindowWithCursor>
        {children}
      </WindowWithCursor>
    )
    expect(wrapper.contains(children)).toBe(true)
  })

  it('should be visible on screen after transition', () => {
    const wrapper = mount(<WindowWithCursor />)
    jest.runAllTimers()
    const transform = wrapper.find('div').prop('style').transform.match(/\([^,]*,([^,]*),[^,]*\)*/)
    const translateY = parseInt(transform[1], 10)
    expect(translateY).toBe(0)
  })
})
