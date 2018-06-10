'use strict'

import React, { Component } from 'react'
import {connect} from 'react-redux'
import ProductList from './product-list';
import CategorySelector from './category-selector'

/**
 * COMPONENT
 */
class Home extends Component {
  render () {
    const { email } = this.props.user
    const { isLoggedIn } = this.props

    return (
      <div className='home-wrapper'>
        {isLoggedIn && (
          <h3>Welcome, {email}</h3>
        )}
        <CategorySelector />
        <ProductList match={this.props.match || null} />
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

