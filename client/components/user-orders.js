'use strict'

import React, { Component } from 'react'
import { Segment, Header, Divider, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getOrdersByUserServer } from '../store/order';
import IndividualOrder from './individual-order'


class UserOrders extends Component {
  constructor(props) {
    super(props)
    props.getOrdersByUser(this.props.user.id)
  }

  render() {
    return (
      <div className='home-wrapper'>
        <Segment padded>
          <Header as="h2">
            Previous Orders:
          </Header>
          {this.props.orders.map(order =>
            <IndividualOrder order={order} lineitems={order.line_items} key={order.id} />)
          }
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrdersByUser: (userId) => dispatch(getOrdersByUserServer(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders)
