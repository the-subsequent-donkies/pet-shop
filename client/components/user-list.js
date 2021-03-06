'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAllUsers, createUser } from '../store/admin-user-control';
import { connect } from 'react-redux';
import { Segment, Header, Icon, Button } from 'semantic-ui-react'
import IndividualUser from './individual-user'
import UserForm from './user-form'

class UserList extends Component {
  constructor (props) {
    super(props)
    this.props.getUsers()
    this.state = {
      addFormBool: false
    }
  }

  handleClick = (evt) => {
    evt.preventDefault()
    this.setState(prevState => {
      return {
        addFormBool: !prevState.addFormBool
      }
    })
  }

  render () {
    const { allUsers } = this.props
    return (
      <div className='home-wrapper'>
        <div className='center-container'>
          <Segment attached='top'>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon
                name='users'
                style={{ marginRight: '1rem', marginLeft: '.25rem', fontSize: '1.5rem' }}
              />
                <Header
                  as='h2'
                  style={{ margin: '0.5rem 0 .5rem 0' }}
                  content='Edit Users'
                />
              </div>
              <Button onClick={this.handleClick}>
                Add User
              </Button>
            </div>
          </Segment>
          {this.state.addFormBool ?
            <Segment attached>
              <UserForm formAction={this.props.addUser} />
            </Segment> : null}
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
    getUsers: () => dispatch(getAllUsers()),
    addUser: (user) => dispatch(createUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
