import React from 'react'
import { shallow, mount } from 'enzyme'

jest.unmock('./../')
import Gif from './../'

describe('<Gif />', function () {
  it('should render its children', () => {
    const children = (<div className='Bio-child' />)
    const wrapper = shallow(
      <Gif src='image.gif'>
        {children}
      </Gif>
    )
    expect(wrapper.contains(children)).toBe(true)
  })

  it('should use its className', () => {
    const test = 'test'
    const wrapper = shallow(
      <Gif className={test} src='image.gif' />
    )
    expect(wrapper.hasClass(test)).toEqual(true)
  })

  it('should render its source image', () => {
    const image = 'image.gif'
    const wrapper = mount(
      <Gif src={image} />
    )

    expect(wrapper.find('img').props().src).toEqual(image)
  })
})
