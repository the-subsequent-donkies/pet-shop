'use strict'

import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'
const ADD_A_USER = 'ADD_A_USER'
const SELECT_USER = 'SELECT_USER'
const UPDATE_USER_ON_SERVER = 'UPDATE_USER_ON_SERVER'

const getUsers = users => {
  return {
    type: GET_ALL_USERS,
    users
  }
}

const selectUser = user => {
  return {
    type: SELECT_USER,
    user
  }
}

const addUser = user => {
  return {
    type: ADD_A_USER,
    user
  }
}

const updateUserServer = user => {
  return {
    type: UPDATE_USER_ON_SERVER,
    user
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/users')
    dispatch(getUsers(data))
  }
}

export const createUser = user => {
  return async dispatch => {
    const { data } = await axios.post('/api/users/', user)
    dispatch(addUser(data))
  }
}

export const selectUserToEdit = userId => {
  return async dispatch => {
    const { data } = await axios.get(`/api/users/${userId}`)
    dispatch(selectUser(data))
  }
}

export const updateUserOnServer = user => {
  return async dispatch => {
    const { data } = await axios.put(`/api/users/${user.id}`, user)
    dispatch(updateUserServer(data))
  }
}

export const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return [ ...state, ...action.users ]
    case ADD_A_USER:
      return [ ...state, action.user ]
    default:
      return state
  }
}

export const selectedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_USER:
      return { ...state, ...action.user }
    case UPDATE_USER_ON_SERVER:
      return { ...state, ...action.user }
    default:
      return state
  }
}
