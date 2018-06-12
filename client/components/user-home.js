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
              <>
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
              </>
            )
          }
          {
            props.user.isAdmin &&
            (
              <>
                <Segment color="red">
                  <Header as={Link} to="/user/orders">
                    <Icon name="cart arrow down" />
                    Edit Orders
                </Header>
                </Segment>
                <Segment color="red">
                  <Header as={Link} to="/users">
                    <Icon name="users" />
                    Edit Users
                  </Header>
                </Segment>
                <Segment color="red">
                  <Header as={Link} to="/">
                    <Icon name="tags" />
                    Edit Categories
                  </Header>
                </Segment>
                <Segment color="red">
                  <Header as={Link} to="/newproduct">
                    <Icon name="edit" />
                    Add Products
                  </Header>
                </Segment>
                <Segment color="red">
                  <Header as={Link} to="/">
                    <Icon name="line graph" />
                    Analytics
                  </Header>
                </Segment>
              </>
            )
          }
        </Segment.Group>

      </div >
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    allOrders: state.allOrders
  }
}

export default connect(mapStateToProps, null)(UserHome)

