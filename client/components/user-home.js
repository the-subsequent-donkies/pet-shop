'use strict'

import React, { Component } from 'react'
import { Segment, Header, Divider, Icon } from 'semantic-ui-react'

const UserHome = (props) => {
  console.log('userhome props: ', props)
  return (
    <div>
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
            Member since {props.user.createdAt.toString().slice(0, 4)}
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
            <Segment padded color="blue">
              <Segment padded>
                <Header as='h4'>
                  <Icon name="user circle" />
                  Update Profile
            </Header>
              </Segment>
              <Segment padded>
                <Header as='h4'>
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
          <div>
            <Segment.Group
              raised
              style={{ width: '100%' }}
            >
              <Segment padded color="green">
                <Segment padded>
                  <Header as='h4'>
                    <Icon name="cart" />
                    Edit Orders
                  </Header>
                </Segment>
                <Segment padded>
                  <Header as='h4'>
                    <Icon name="users" />
                    Edit Users
                  </Header>
                </Segment>
                <Segment padded>
                  <Header as='h4'>
                    <Icon name="tags" />
                    Edit Categories
                  </Header>
                </Segment>
                <Segment padded>
                  <Header as='h4'>
                    <Icon name="edit" />
                    Edit Products
                  </Header>
                </Segment>
              </Segment>
            </Segment.Group>
          </div>
        )}
    </div>
  )
}

export default UserHome
