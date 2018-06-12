'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Segment, Divider, Header, List } from 'semantic-ui-react'

const IndividualOrder = (props) => {
  console.log(props)
  return (
    <div className='home-wrapper'>
      <div className='center-container'>
        <Segment padded>
          <List>
            {
              props.lineitems.map(lineitem =>
                <List.Item key={lineitem.id}>
                  <List.Icon name='remove' />
                  <List.Content>{lineitem.product.name}</List.Content>
                </List.Item>
              )}
          </List>
        </Segment>
      </div>
    </div>
  )
}


export default IndividualOrder
