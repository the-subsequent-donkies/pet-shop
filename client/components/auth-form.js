'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import { auth } from '../store/user'
import { Form, Input, Button } from 'semantic-ui-react'

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error, user } = props
  const isLoggedIn = Object.keys(user).length > 0 && !user.error
  return (
    <div className='custom-form'>
      {
        isLoggedIn ?
          <Redirect to="/" />
          : (
            <Form name={name} onSubmit={handleSubmit}>
              {props.name === 'signup' && (
                <Form.Group widths='equal'>
                  <Form.Field
                    name='firstName'
                    control={Input}
                    label='Name'
                    placeholder='Your full name'
                  />
                  <Form.Field
                    name='address'
                    control={Input}
                    label='Address'
                    placeholder='Enter your address'
                  />
                </Form.Group>
              )}
              <Form.Group widths='equal'>
                <Form.Field
                  name='email'
                  control={Input}
                  label='Email'
                  placeholder='Your email'
                />
                <Form.Field
                  name='password'
                  control={Input}
                  type='password'
                  label='Password'
                  placeholder='Enter your password'
                />
              </Form.Group>
              <Form.Group>
                <Form.Field
                  control={Button}
                  content={displayName}
                />
                <Button
                  content={`${displayName} with Google`}
                  as='a'
                  href='/auth/google'
                />
              </Form.Group>
              {error && error.response && <div> {error.response.data} </div>}
            </Form>
          )
      }
    </div>
  )
}

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    user: state.user
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const name = evt.target.firstName.value
      const address = evt.target.address.value
      dispatch(auth(email, password, name, address, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
