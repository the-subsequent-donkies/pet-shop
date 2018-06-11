'use strict'

import React from 'react';
import { connect } from 'react-redux';
import LineItem from './line-item';
import { getOrderServer } from '../store/order'
import { Segment, Header, Divider } from 'semantic-ui-react'

const Order = ({ order }) => {

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
                Order Total: Soon to come!
              </Segment>
            : null
          }
        </Segment.Group>
      </div>
    </div>
  )

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
