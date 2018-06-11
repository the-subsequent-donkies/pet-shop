'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import NewProductForm from './components/new-product-form'
import EditProductForm from './components/edit-product-form'
import Navbar from './components/navbar'
import { Login, Signup } from './components/auth-form'
import Order from './components/order'
import { me, logout } from './store/user'
import CategorySelector from './components/category-selector'
import { Home } from './components'
import SelectedProduct from './components/selected-product'
import { getOrderServer } from './store/order';
import EditReviewForm from './components/edit-review-form'


class Routes extends Component {
  constructor(props) {
    super(props)
    this.props.loadInitialData()
      .then(() => {
        this.props.getOrder(this.props.user.id)
      })
  }

  render() {
    return (
      <div>
        <Navbar />
        <Route exact path='/' component={Home} />
        <Route exact path='/categories/:categoryId' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route path='/newproduct' component={NewProductForm} />
        <Route path='/reviews/editreview/:reviewId' component={EditReviewForm} />
        <Route exact path='/products/:productId' component={SelectedProduct} />
        <Route exact path='/products/:productId/edit' component={EditProductForm} />
        <Route exact path='/categories' component={CategorySelector} />
        <Route exact path="/order" component={Order} />
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => dispatch(me()),
    getOrder: (userId) => dispatch(getOrderServer(userId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
