'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import LineItem from './line-item';
import { getOrderServer } from '../store/order'

const sampleOrder = {lineItems: [
  {
    id: 1,
    productId: 1,
    currentPrice: 2.5,
    quantity: 5
  },
  {
    id: 2,
    productId: 2,
    currentPrice: 3.5,
    quantity: 6
  },
  {
    id: 3,
    productId: 3,
    currentPrice: 2.55,
    quantity: 9
  },
  {
    id: 4,
    productId: 4,
    currentPrice: 5.55,
    quantity: 90
  }
]}

class Order extends Component {
  constructor() {
    super()
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.id && nextProps.id !== prevState.id) {
  //     return nextProps.order
  //   }
  //   return null
  // }

  // async componentDidMount() {
  //   console.log('props in cdm', this.props)
  //   if (this.props.user.id) {
  //     await this.props.getOrder(this.props.user.id)
  //   }
  // }

  render() {
    return (
      <div>
        <h3>Shopping Cart</h3>
        <div className="user-order-body container">
          {
            (this.props.order.line_items) ?
            (this.props.order.line_items.map((lineItem) => {
              return <LineItem key={lineItem.id} lineItem={lineItem} />
            })) :
            <div />
          }
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    order: state.order
  }
}

const mapDispatch = (dispatch) => {
  return {
    getOrder: (userId) => dispatch(getOrderServer(userId)),
  }
}

export default connect(mapState, mapDispatch)(Order)
