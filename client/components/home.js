'use strict'

import React from 'react'
import {connect} from 'react-redux'
import ProductList from './product-list';

/**
 * COMPONENT
 */
const Home = (props) => {
  const { email } = props.user
  const { isLoggedIn } = props

  return (
    <div>
      {isLoggedIn && (
        <h3>Welcome, {email}</h3>
      )}
      <ProductList />
    </div>
  )
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

