'use strict'

import React, { Component } from 'react'
import { Segment, Header, Card, Divider, Icon, Table } from 'semantic-ui-react'
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
          <Card fluid>
            <Card.Header
              as="h2"
              style={{
                marginTop: '1rem',
                textAlign: 'center'
              }}
            >
              Previous Orders
            </Card.Header>
            <Card.Content>
              <p>Thank you for choosing Pet Shop!</p>
              {(this.props.user && !this.props.user.isAdmin) && (
                this.props.orders.map(order => {
                  if (order.line_items.length > 0 && order.status !== 'Initialized') {
                    return <IndividualOrder order={order} lineitems={order.line_items} user={this.props.user} key={order.id} />
                  }
                })
              )}
              {(this.props.user && this.props.user.isAdmin) && (this.props.allOrders.map(order => {
                if (order.line_items.length > 0 && order.status !== 'Initialized') {
                  return <IndividualOrder order={order} lineitems={order.line_items} user={this.props.user} key={order.id} />
                }})
              )}
            </Card.Content>
          </Card>
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
