import React from 'react'
import { configure, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Hello from './'

configure({ adapter: new Adapter() })

test('it works', () => {
  expect(render(<Hello />).text()).toEqual('Hello react')
})
