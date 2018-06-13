'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getOrderServer, updateOrderStatusServer } from '../store/order'
import { Segment, Divider, Header, List, Table, Dropdown, Menu } from 'semantic-ui-react'

class IndividualOrder extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeItem: props.order.status
    }
  }

  handleItemClick = async (event, { name }) => {
    this.setState({ activeItem: name })
    await this.props.updateStatus(this.props.order, this.state.activeItem, this.props.user.id)
  }

  render() {
    return (
      <div>
        <Segment>
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
                  (<Table.Row key={lineitem.id}>
                    <Table.Cell>{lineitem.orderId}</Table.Cell>
                    <Table.Cell>{lineitem.product.name}</Table.Cell>
                    <Table.Cell>{lineitem.currentPrice}</Table.Cell>
                    <Table.Cell>{lineitem.quantity}</Table.Cell>
                    <Table.Cell>{this.props.order.status}</Table.Cell>
                  </Table.Row>)
                )
              }
            </Table.Body>
          </Table>

          {(this.props.user && this.props.user.isAdmin) && (
            <Menu>
              <Dropdown item
                text="Change Status"
                position="right">
                <Dropdown.Menu position="right">
                  <Dropdown.Item
                    name="Initialized"
                    active={this.state.activeItem === "Initialized"}
                    onClick={this.handleItemClick}>Initialized</Dropdown.Item>
                  <Dropdown.Item
                    name="Processing"
                    active={this.state.activeItem === "Processing"}
                    onClick={this.handleItemClick}>Processing</Dropdown.Item>
                  <Dropdown.Item
                    name="Cancelled"
                    active={this.state.activeItem === "Cancelled"}
                    onClick={this.handleItemClick}>Cancelled</Dropdown.Item>
                  <Dropdown.Item
                    name="Completed"
                    active={this.state.activeItem === "Completed"}
                    onClick={this.handleItemClick}>Completed</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
          )}
        </Segment>
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
