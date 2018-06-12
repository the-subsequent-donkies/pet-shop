'use strict'

import React, { Component } from 'react'
import { Segment, Header, Divider, Icon, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getOrdersByUserServer, getAllOrdersServer } from '../store/order';
import IndividualOrder from './individual-order'


class UserOrders extends Component {
  constructor(props) {
    super(props)
    this.props.getOrdersByUser(this.props.user.id)
    this.props.getAllOrders()
  }


  render() {
    return (
      <div className='home-wrapper'>
        <div className='center-container'>
          <Segment padded>
            <Header as="h2" textAlign="center">
              Orders:
            </Header>
            {(this.props.user && !this.props.user.isAdmin) && (
              this.props.orders.map(order =>
                <IndividualOrder order={order} lineitems={order.line_items} user={this.props.user} key={order.id} />)
            )}
            {(this.props.user && this.props.user.isAdmin) && (this.props.allOrders.map(order =>
              <IndividualOrder order={order} lineitems={order.line_items} user={this.props.user} key={order.id} />)
            )}
          </Segment>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    orders: state.orders,
    allOrders: state.allOrders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrdersByUser: (userId) => dispatch(getOrdersByUserServer(userId)),
    getAllOrders: () => dispatch(getAllOrdersServer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders)
