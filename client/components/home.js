'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import AllProducts from './all-products'
/**
 * COMPONENT
 */
class Home extends Component {
  render() {
    const { email } = this.props.user
    const { isLoggedIn } = this.props

    return (
      <div>
        {isLoggedIn && (
          <h3>Welcome, {email}</h3>
        )}
        <AllProducts />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(Home)

