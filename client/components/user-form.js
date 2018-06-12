'use strict'

import React, { Component } from 'react'
import history from '../history'
import { connect } from 'react-redux'
import { Form, Input, Button, Radio, Checkbox } from 'semantic-ui-react'

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

  handleRadioChange = () => {
    this.setState(prevState => {
      return {
        isAdmin: !prevState.isAdmin
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.invokeSubmit()
  }

  invokeSubmit = async () => {
    if (this.props.id) {
      await this.props.formAction(this.props.id, { ...this.state })
    } else {
      await this.props.formAction({ ...this.state })
      this.setState({
        name: '',
        email: '',
        address: '',
        isAdmin: false
      })
    }
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
            <Form.Field>
              <Checkbox
                name='isAdmin'
                toggle
                style={{ marginTop: '.5rem' }}
                checked={this.state.isAdmin}
                onChange={this.handleRadioChange}
              />
            </Form.Field>
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

export default connect(mapStateToProps)(UserForm)
