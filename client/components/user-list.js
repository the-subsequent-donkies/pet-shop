'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAllUsers } from '../store/all-user';
import { connect } from 'react-redux';
import { Card, Form, Button } from 'semantic-ui-react'

class UserList extends Component {
  constructor (props) {
    super(props)

  }
}

const mapStateToDispatch = state => {
  return {
    allUsers: state.allUsers
  }
}

export default connect()
