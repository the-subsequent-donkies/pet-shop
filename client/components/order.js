'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import LineItem from './line-item';
import { getOrderServer, updateOrderStatusServer } from '../store/order'
import UserHome from './user-home'
import { Segment, Header, Divider, Button } from 'semantic-ui-react'

class Order extends Component {
  handleClick = async (evt) => {
    await this.props.updateStatus(this.props.order, 'Completed', this.props.user.id)
  }

  render() {
    let order = this.props.order
    return (
      <div className='home-wrapper'>
        <div className='center-container'>
          <Segment.Group
            raised
            style={{ width: '100%' }}
          >
            <Segment padded>
              <Header as='h1'>
                Shopping Cart
              </Header>
              {
                order.line_items ?
                  order.line_items.map(lineItem => {
                    return <LineItem key={lineItem.id} lineItem={lineItem} />
                  }) : null
              }
            </Segment>
            {
              order.line_items && order.line_items.length > 0 ?
                <Segment
                  padded
                  style={{ clear: 'both' }}
                >
                  Order Total: ${this.props.getOrderCost(order)}
                  <Button
                    onClick={this.handleClick}
                    style={{ float: 'right' }}
                  >
                    Submit Order
                  </Button>
                </Segment>
                :
                <Segment padded>
                  Your cart is empty, start shopping to add items to it!
                </Segment>
            }
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
    updateStatus: (order, status, userId) => dispatch(updateOrderStatusServer(order, status, userId)),
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
