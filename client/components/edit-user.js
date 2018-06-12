'use strict'

import React, { Component } from 'react'
import history from '../history'
import { connect } from 'react-redux'
import { updateUserServer } from '../store/user'
import { Form, Input, Button, Radio, Checkbox } from 'semantic-ui-react'

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.user.name || '',
      email: this.props.user.email || '',
      address: this.props.user.address || '',
      isAdmin: this.props.user.isAdmin || false
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log("dispatching update", this.props.user.id, this.state)
    this.props.updateUser(this.props.user.id, { name: this.state.name, email: this.state.email, address: this.state.address, isAdmin: this.state.isAdmin })
  }

  render() {
    return (
      <div className='home-wrapper'>
        <div className='center-container'>
          <Form
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Form.Group>
                <Form.Field
                  name='name'
                  control={Input}
                  label='Name'
                  placeholder="User's name"
                  value={this.state.name}
                />
                <Form.Field
                  name='address'
                  control={Input}
                  label='Address'
                  placeholder="User's address"
                  value={this.state.address}
                />
                <Form.Field
                  name='email'
                  control={Input}
                  label='Email'
                  placeholder="User's email"
                  value={this.state.email}
                />
              </Form.Group>
              <Form.Field
                control={Button}
                type='submit'
                content='Submit'
              />
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: (userId, user) => dispatch(updateUserServer(userId, user))
  }
}

export default connect(mapState, mapDispatch)(EditUser)
