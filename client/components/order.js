'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import LineItem from './line-item'
import { getOrderServer, updateOrderStatusServer } from '../store/order'
import { Segment, Header, Divider, Button } from 'semantic-ui-react'
import axios from 'axios'



class Order extends Component {
  handleClick = (evt) => {
    const handler = StripeCheckout.configure({
      key: 'pk_test_GRX2M07RaRMsxt0aa33tS7JH',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      billingAddress: true,
      token: function(token) {
        console.log(token)
        axios.post('/api/charge', token)
      }
    })

    let updateStatus = this.props.updateStatus
    let order = this.props.order
    let id = this.props.user.id

    evt.preventDefault()
    handler.open({
      name: 'Pet Shop',
      description: 'Your top choice for pet supplies',
      amount: +this.props.getOrderCost(this.props.order) * 100,
      closed: function() {
        updateStatus(order, 'Completed', id)
      }
    })
  }

  render() {
    let { order, isLoggedIn } = this.props
    return (
      <div className='home-wrapper'>
        <div className='center-container'>
          <Segment.Group
            raised
            style={{ width: '100%' }}
          >
            <Segment
              padded
            >
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
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <strong>Order Total:</strong> ${this.props.getOrderCost(order)}
                    </div>
                    {isLoggedIn ?
                      <div>
                        <Button
                          onClick={this.handleClick}
                        >
                          Checkout
                        </Button>
                      </div>
                    :
                      <div>
                        <Button
                          as={Link}
                          to='/signup'
                        >
                          Signup
                        </Button>
                        <Button
                          as={Link}
                          to='/login'
                        >
                          Login to Checkout
                        </Button>
                      </div>
                    }
                  </div>
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
    order: state.order,
    isLoggedIn: !!state.user.id
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
