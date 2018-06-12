'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Segment, Header, Grid, Button } from 'semantic-ui-react'
import UserForm from './user-form'
import { updateUserOnServer } from '../store/admin-user-control'

class IndividualUser extends Component {
  constructor (props) {
    super(props)
    this.state = { editFormBool: false }
  }

  handleClick = () => {
    this.setState(prevState => {
      return {
        editFormBool: !prevState.editFormBool
      }
    })
  }

  render () {
    const { name, email, isAdmin, address } = this.props.user
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
            <Button
              onClick={this.handleClick}
            >
              Edit
            </Button>
          </Grid.Column>
        </Grid>
        {this.state.editFormBool ?
          <Segment style={{ marginTop: '1rem' }}>
            <UserForm {...this.props.user} formAction={this.props.updateUser} />
          </Segment> : null}
      </Segment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (userId, user) => dispatch(updateUserOnServer(userId, user))
  }
}

export default connect(null, mapDispatchToProps)(IndividualUser)
