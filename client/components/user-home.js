'use strict'

import React from 'react'
import { Segment, Header, Divider, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import UserOrders from './user-orders'

const UserHome = (props) => {
  return (
    <div className='home-wrapper'>
      <div className='center-container'>
        <Segment.Group
          raised
          style={{ width: '100%' }}
        >
          <Segment color="blue">
            <Header as='h1'>
              Welcome, {props.user.name}!
          </Header>
            <Divider />
            <Header as='h4'>
              Member Since {props.user.createdAt}
            </Header>
          </Segment>
        </Segment.Group>
        <Segment.Group
          horizontal
          raised
          style={{ width: '100%' }}
        >
          {
            (props.user) &&
            (
              <Segment.Group
                horizontal
                raised
                style={{ width: '100%' }}
              >
                <Segment padded>
                  <Header as={Link} to="/">
                    <Icon name="user circle" />
                    Update Profile
                </Header>
                </Segment>
                <Segment padded>
                  <Header as={Link} to="/user/orders">
                    <Icon name="cart arrow down" />
                    Order History
                </Header>
                </Segment>
              </Segment.Group>
            )
          }
          {
            props.user.isAdmin &&
            (
              <Segment.Group
                horizontal
                raised
                style={{ width: '100%' }}
              >
                <Segment padded>
                  <Header as={Link} to="/">
                    <Icon name="cart" />
                    Edit Orders
                  </Header>
                </Segment>
                <Segment padded>
                  <Header as={Link} to="/">
                    <Icon name="users" />
                    Edit Users
                  </Header>
                </Segment>
                <Segment padded>
                  <Header as={Link} to="/">
                    <Icon name="tags" />
                    Edit Categories
                  </Header>
                </Segment>
                <Segment padded>
                  <Header as={Link} to="/newproduct">
                    <Icon name="edit" />
                    Add Products
                  </Header>
                </Segment>
                <Segment padded>
                  <Header as={Link} to="/">
                    <Icon name="line graph" />
                    Analytics
                  </Header>
                </Segment>
              </Segment.Group>
            )
          }
        </Segment.Group>
      </div >
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(UserHome)

