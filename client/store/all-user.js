'use strict'

import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'

const getUsers = users => {
  return {
    type: GET_ALL_USERS,
    users
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/users')
    dispatch(getUsers(data))
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return [...state, ...action.users]
    default:
      return state
  }
}
