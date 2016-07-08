import React from 'react'
import { mount } from 'enzyme'

jest.unmock('./../')
import Photo from './../'

describe('<Photo />', function () {
  it('should render an image', () => {
    const image = 'image.png'
    const wrapper = mount(
      <Photo url={image} />
    )

    expect(wrapper.find('img').props().src).toEqual(image)
  })
})
