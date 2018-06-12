'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Segment, Divider, Header, List, Table } from 'semantic-ui-react'

const IndividualOrder = (props) => {
  console.log(props)
  return (
    <div className='home-wrapper'>
      <div className='center-container'>
        <Header as="h3">Order# {props.order.id}</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Product Name</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              props.lineitems.map(lineitem =>
                <Table.Row key={lineitem.id}>
                  <Table.Cell>{lineitem.product.name}</Table.Cell>
                  <Table.Cell>{lineitem.currentPrice}</Table.Cell>
                  <Table.Cell>{lineitem.quantity}</Table.Cell>
                  <Table.Cell>{props.order.status}</Table.Cell>
                </Table.Row>
              )}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}


export default IndividualOrder
