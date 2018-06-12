'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAllUsers } from '../store/all-user';
import { connect } from 'react-redux';
import { Segment, Header, Icon, Button } from 'semantic-ui-react'
import IndividualUser from './individual-user'

class UserList extends Component {
  constructor (props) {
    super(props)
    this.props.getUsers()
  }

  render () {
    const { allUsers } = this.props
    return (
      <div className='home-wrapper'>
        <div className='center-container'>
          <Segment attached='top'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Header
                as='h2'
                style={{ margin: '0.5rem 0 .5rem 0' }}
                content='Users'
              />
              <Icon name='users' style={{ marginLeft: '1rem' }} />
            </div>
          </Segment>
          {allUsers.map(user => <IndividualUser user={user} key={user.id} />)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allUsers: state.allUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getAllUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
