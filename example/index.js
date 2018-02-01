import React from 'react'
import { render } from 'react-dom'
import Multipane from '../src/Multipane'
import MultipaneResizer from '../src/MultipaneResizer'
import './style.scss'

const App = () =>
  <Multipane styleName={'vertical-panes'}>
    <div className={'pane pane-1'}>
      <p>tttest</p>
    </div>
    <MultipaneResizer />
  </Multipane>

render(<App />, document.getElementById('app'))
