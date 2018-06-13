'use strict'

import React from 'react'
import { Segment, Header, Divider, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import UserOrders from './user-orders'
import IndividualUser from './individual-user'

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
              Member Since {props.user.createdAt.toString().slice(0, 4)}
            </Header>
          </Segment>
        </Segment.Group>
        <Segment.Group
          horizontal
          raised
        >
          {
            (props.user && !props.user.isAdmin) &&
            (
              <Segment.Group horizontal>
                <Segment color="green">
                  <Header as={Link} to="/profile/edit">
                    <Icon name="user circle" />
                    Update Profile
                  </Header>
                </Segment>
                <Segment color="green">
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
              >
                <Segment color="red">
                  <Header
                    as={Link}
                    to="/user/orders"
                    style={{ fontSize: '1.5rem' }}
                  >
                    <Icon name="cart arrow down" />
                    All Orders
                  </Header>
                </Segment>
                <Segment color="red">
                  <Header
                    as={Link}
                    to="/users"
                    style={{ fontSize: '1.5rem' }}
                  >
                    <Icon name="users" />
                    Edit Users
                  </Header>
                </Segment>
                <Segment color="red">
                  <Header
                    as={Link}
                    to="/"
                    style={{ fontSize: '1.5rem' }}
                  >
                    <Icon name="tags" />
                    Edit Categories
                  </Header>
                </Segment>
                <Segment color="red">
                  <Header
                    as={Link}
                    to="/newproduct"
                    style={{ fontSize: '1.5rem' }}
                  >
                    <Icon name="edit" />
                    Add Products
                  </Header>
                </Segment>
                <Segment color="red">
                  <Header
                    as={Link}
                    to="/"
                    style={{ fontSize: '1.5rem' }}
                  >
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

