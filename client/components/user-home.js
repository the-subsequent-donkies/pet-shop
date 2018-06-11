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
        <UserOrders />
        <Segment.Group
          raised
          style={{ width: '100%' }}
        >
          <Segment padded color='red'>
            <Header as='h1'>
              Welcome, {props.user.name}!
          </Header>
            <Divider />
            <Header as='h4'>
              Member Since {props.user.createdAt.toString().slice(0, 4)}
            </Header>
          </Segment>
        </Segment.Group>
        {
          //isLoggedIn &&
          (
            <Segment.Group
              raised
              style={{ width: '100%' }}
            >
              <Segment padded color="blue" >
                <Segment padded>
                  <Header as={Link} to="/">
                    <Icon name="user circle" />
                    Update Profile
                </Header>
                </Segment>
                <Segment padded>
                  <Header as={Link} to="/">
                    <Icon name="cart arrow down" />
                    Order History
                </Header>
                </Segment>
              </Segment>
            </Segment.Group>
          )}
        {
          //isAdmin &&
          (
            <Segment.Group
              raised
              style={{ width: '100%' }}
            >
              <Segment padded color="green">
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
              </Segment>
            </Segment.Group>
          )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(UserHome)
