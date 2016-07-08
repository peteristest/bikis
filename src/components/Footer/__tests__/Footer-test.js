import React from 'react'
import { mount } from 'enzyme'

jest.unmock('./../')
import Footer from './../'

describe('<Footer />', function () {
  it('should render its text content', () => {
    const text = 'distorted text'
    const wrapper = mount(
      <Footer content='distorted text' />
    )
    expect(wrapper.text()).toEqual(text)
  })
})
