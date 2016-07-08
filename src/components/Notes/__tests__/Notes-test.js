import React from 'react'
import { render } from 'enzyme'

jest.unmock('./../index')
import Notes from './../index'

describe('<Notes />', function () {
  it('should render the text', () => {
    const text = 'testing'
    const wrapper = render(
      <Notes text={text} />
    )
    expect(wrapper.text()).toEqual(text)
  })
})
