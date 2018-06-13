'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { StripeProvider } from 'react-stripe-elements'
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

import io from 'socket.io-client'
const socket = io(window.location.origin)
import {socketEmit} from './socket'

import UserHome from './components/user-home'
import UserList from './components/user-list'
import UserOrders from './components/user-orders'
import EditUser from './components/edit-user'
import AddCategory from './components/add-category'
import SearchBar from './components/search-bar'

class Routes extends Component {
  constructor(props) {
    super(props)
    this.props.loadInitialData()
      .then(() => {
        if (this.props.isLoggedIn) {
          if (localStorage.getItem('orderId') && localStorage.getItem('orderId') !== 'undefined') {
            this.props.getOrder(this.props.user.id)
              .then(() => {
                return this.props.mergeOrders(parseInt(localStorage.getItem('orderId'), 10), this.props.user.id)
              })
          }
          return this.props.getOrder(this.props.user.id)
        } else if (!localStorage.getItem('orderId') || localStorage.getItem('orderId') === 'undefined') {
          return this.props.createLocalOrder()
        } else {
          return this.props.getLocalOrder(localStorage.getItem('orderId'))
        }
      })
      .then(() => {
        // console.log(socketEmit)
        socketEmit('SOCKET_CONNECTION', {userId: this.props.user.id}, socket)
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
        <Route exact path="/users" component={UserList} />
        <Route exact path="/profile/edit" component={EditUser} />
        <Route exact path="/addcategory" component={AddCategory} />
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
