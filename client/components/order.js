'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import LineItem from './line-item';
import { getOrderServer, updateOrderStatusServer } from '../store/order'
import UserHome from './user-home'
import { Segment, Header, Divider, Button } from 'semantic-ui-react'

class Order extends Component {

  handleClick = async (evt) => {
    await this.props.updateStatus(this.props.order.id, 'Completed', this.props.user.id)
  }

  render() {
    let order = this.props.order
    return (
      <div className="home-wrapper">
        <div>
          <UserHome user={this.props.user} />
        </div>
        <div className="center-container">
          <Segment.Group
            raised
            style={{ width: '100%' }}
          >
            <Segment padded>
              <Header as="h1">
                Shopping Cart
              </Header>
              <Divider />
              {
                order.line_items && order.line_items.length === 0 ?
                  <p>Your cart is currently empty - start shopping and adding items to your cart!</p>
                  : <p>Thank you for choosing the Pet Shop for all your pet supply needs!</p>
              }
            </Segment>
            {
              order.line_items ?
                order.line_items.map(lineItem => {
                  return <LineItem key={lineItem.id} lineItem={lineItem} />
                }) : null
            }
            {
              order.line_items && order.line_items.length > 0 ?
                <Segment
                  padded
                  style={{ clear: 'both' }}
                >
                  Order Total: ${this.props.getOrderCost(order)}
                </Segment>
                : null
            }
            <Button onClick={this.handleClick}>
              Submit Order
            </Button>
          </Segment.Group>
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
    updateStatus: (orderId, status, userId) => dispatch(updateOrderStatusServer(orderId, status, userId)),
    getOrderCost: (order) => {
      let ret = 0
      order.line_items.forEach(lineItem => {
        ret = ret + parseFloat(Math.round(lineItem.currentPrice * lineItem.quantity * 100) / 100)
      })
      ret = parseFloat(Math.round(ret * 100) / 100).toFixed(2)
      return ret
    }
  }
}

export default connect(mapState, mapDispatch)(Order)
