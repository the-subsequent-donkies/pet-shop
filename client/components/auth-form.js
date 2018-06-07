import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import PropTypes from 'prop-types'
import {auth} from '../store/user'
import history from '../history'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error, user} = props
  console.log('in auth form')
  const keys = Object.keys(user)

  return (
    <div>
      {
        Object.keys(user).length > 0 && !user.error ?
        <Redirect to="/" /> :
        <div>
          <form onSubmit={handleSubmit} name={name}>
            <div>
              <label htmlFor="email"><small>Email</small></label>
              <input name="email" type="text" />
            </div>
            <div>
              <label htmlFor="password"><small>Password</small></label>
              <input name="password" type="password" />
            </div>
            <div>
              <button type="submit">{displayName}</button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
          <a href="/auth/google">{displayName} with Google</a>
        </div>
      }
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
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
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
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
