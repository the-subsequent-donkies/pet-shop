'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAllUsers } from '../store/all-user';
import { connect } from 'react-redux';
import { Card, Form, Button } from 'semantic-ui-react'

const IndividualUser = (props) => {
  const { name, email, isAdmin } = props.user
  return (
    <Card
      fluid
      raised
    >
      <Card.Content>
        <Card.Header
          as='h3'
          style={{ margin: '1rem 0 .5rem 0' }}
        >
          {name} - Admin? {isAdmin}
        </Card.Header>
        {email}
      </Card.Content>
    </Card>
  )
}

export default IndividualUser
