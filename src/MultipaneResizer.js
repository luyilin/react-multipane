import React from 'react'
import PropTypes from 'prop-types'

class MultipaneResizer extends React.Component {

  render() {
    const { children } = this.props
    return(
      <div className={'multipane-resizer'}>
        {children}
      </div>
    )
  }
}

MultipaneResizer.propTypes = {
  children: PropTypes.node
}

export default MultipaneResizer
