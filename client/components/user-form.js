'use strict'

import React, { Component } from 'react'
import history from '../history'
import { connect } from 'react-redux'
import { Form, Input, Button, Radio } from 'semantic-ui-react'
import { createUser } from '../store/admin-user-control'

class UserForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: this.props.name || '',
      email: this.props.email || '',
      address: this.props.address || '',
      isAdmin: this.props.isAdmin || false
    }
  }

  handleTextChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleRadioChange = (event, data) => {
    this.setState({
      isAdmin: data.checked
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.invokeSubmit()
  }

  invokeSubmit = async () => {
    await this.props.addUser({ ...this.state })
    this.setState({
      name: '',
      email: '',
      address: '',
      isAdmin: false
    })
  }

  render () {
    return (
      <Form
        onChange={this.handleTextChange}
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
          <div>
            <strong>Admin</strong>
            <Form.Field
              name='isAdmin'
              control={Radio}
              toggle
              style={{ marginTop: '.5rem' }}
              checked={this.props.isAdmin}
              onChange={this.handleRadioChange}
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Form.Field
            control={Button}
            type='submit'
            content='Submit'
          />
        </div>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.selectedUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: (user) => dispatch(createUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
