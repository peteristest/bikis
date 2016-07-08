import React from 'react'
import { shallow } from 'enzyme'

jest.unmock('./../')
import Tab from './../'

describe('<Tab />', function () {
  it('should render correct tab width', () => {
    const tabWidth = 10
    const wrapper = shallow(
      <Tab width={tabWidth} />
    )
    expect(wrapper.find('span > span').length).toEqual(tabWidth)
  })
})
