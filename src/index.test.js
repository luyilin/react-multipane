import React from 'react'
import { configure, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Multipane from './Multipane'

configure({ adapter: new Adapter() })

test('it works', () => {
  expect(render(<Multipane />).text()).toEqual('Wait for my react multipane component~')
})
