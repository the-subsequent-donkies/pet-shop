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
import { Home } from './components'
import SelectedProduct from './components/selected-product'
import { getOrderServer, getLocalOrderServer, createLocalOrderServer, mergeOrdersServer } from './store/order';

import FilteredProducts from './components/filtered-products'
import EditReviewForm from './components/edit-review-form'
import UserHome from './components/user-home';
import UserOrders from './components/user-orders';


class Routes extends Component {
  constructor(props) {
    super(props)
    // console.log(localStorage.getItem('orderId'))
    this.props.loadInitialData()
      .then(() => {
        if (this.props.isLoggedIn) {
          if (localStorage.getItem('orderId') && localStorage.getItem('orderId') !== 'undefined') {
            // this.props.getLocalOrder(localStorage.getItem('orderId'))
            this.props.getOrder(this.props.user.id)
              .then(() => {
                console.log(localStorage)
                return this.props.mergeOrders(parseInt(localStorage.getItem('orderId'), 10), this.props.user.id)
              })

            // localStorage.removeItem('orderId')
          }
          return this.props.getOrder(this.props.user.id)
        } else if (!localStorage.getItem('orderId') || localStorage.getItem('orderId') === 'undefined') {
          return this.props.createLocalOrder()
        } else {
          return this.props.getLocalOrder(localStorage.getItem('orderId'))
        }
      })
      .then(() => {
        if (!this.props.isLoggedIn) {
          localStorage.setItem('orderId', this.props.orderId)
        }
      })
  }

  render() {
    return (
      <div>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/categories/:categoryId" component={FilteredProducts} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/newproduct" component={NewProductForm} />
        <Route path="/reviews/editreview/:reviewId" component={EditReviewForm} />
        <Route exact path="/products/:productId" component={SelectedProduct} />
        <Route exact path="/products/:productId/edit" component={EditProductForm} />
        <Route exact path="/order" component={Order} />
        <Route exact path="/profile" component={UserHome} />
        <Route exact path="/user/orders" component={UserOrders} />
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    orderId: state.order.id,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => dispatch(me()),
    getOrder: (userId) => dispatch(getOrderServer(userId)),
    createLocalOrder: () => dispatch(createLocalOrderServer()),
    getLocalOrder: (orderId) => dispatch(getLocalOrderServer(orderId)),
    mergeOrders: (localOrderId, userId) => dispatch(mergeOrdersServer(localOrderId, userId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
