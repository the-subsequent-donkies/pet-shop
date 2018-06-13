'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getOrderServer, updateOrderStatusServer } from '../store/order'
import { Card, Segment, Divider, Header, List, Table, Dropdown, Menu } from 'semantic-ui-react'

class IndividualOrder extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeItem: props.order.status
    }
  }

  handleChange = async (event, { name }) => {
    this.setState({ activeItem: name })
    await this.props.updateStatus(this.props.order, this.state.activeItem, this.props.user.id)
  }

  render() {
    return (
      <div className='home-wrapper'>
        <Card fluid>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Order #</Table.HeaderCell>
                <Table.HeaderCell>Product Name</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                this.props.lineitems.map(lineitem =>
                  <Table.Row key={lineitem.id}>
                    <Table.Cell>{lineitem.orderId}</Table.Cell>
                    <Table.Cell>{lineitem.product.name}</Table.Cell>
                    <Table.Cell>{lineitem.currentPrice}</Table.Cell>
                    <Table.Cell>{lineitem.quantity}</Table.Cell>
                    <Table.Cell>{this.props.order.status}</Table.Cell>
                  </Table.Row>
                )
              }
            </Table.Body>
          </Table>
        </Card>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateStatus: (order, status, userId) => dispatch(updateOrderStatusServer(order, status, userId))
  }
}


export default connect(null, mapDispatch)(IndividualOrder)
