'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import AllProducts from './all-products';
import CategorySelector from './category-selector'
import SearchBar from './search-bar'
import FilteredProducts from './filtered-products';
/**
 * COMPONENT
 */
class Home extends Component {
  render() {
    const { email } = this.props.user
    const { isLoggedIn } = this.props
    const unFiltered = Object.keys(this.props.match.params).length < 1
    return (
      <div className='home-wrapper'>
        {isLoggedIn && (
          <h3>Welcome, {email}</h3>
        )}
        <CategorySelector />
        <SearchBar />
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

