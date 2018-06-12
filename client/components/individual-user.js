'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Header, Grid, Button } from 'semantic-ui-react'

const IndividualUser = (props) => {
  const { name, email, isAdmin, address } = props.user
  return (
    <Segment
      raised
      attached
    >
      <Grid columns={3}>
        <Grid.Column>
          <Header
            as='h3'
            style={{ margin: '0.25rem 0 .5rem 0' }}
            content={name}
          />
          <p>{email}</p>
        </Grid.Column>
        <Grid.Column
          style={{ marginTop: '0.5rem' }}
        >
          <p style={{ marginBottom: '0.5rem' }}>{address}</p>
          <p><strong>{isAdmin ? 'Admin' : 'User' }</strong></p>
        </Grid.Column>
        <Grid.Column
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <Button>
            Edit
          </Button>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default IndividualUser
