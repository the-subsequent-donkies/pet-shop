'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAllUsers } from '../store/all-user';
import { connect } from 'react-redux';
import { Segment, Header, Button } from 'semantic-ui-react'

const IndividualUser = (props) => {
  const { name, email, isAdmin } = props.user
  return (
    <Segment
      raised
      attached
    >
      <div style={{ float: 'left' }}>
        <Header
          as='h3'
          style={{ margin: '0.25rem 0 .5rem 0' }}
          content={name}
        />
        {email}
      </div>
      <div>
        {isAdmin.toString()}
      </div>
    </Segment>
  )
}

export default IndividualUser
