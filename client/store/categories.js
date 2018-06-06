'use strict'

import axios from 'axios'

//action types

export const GET_CATEGORIES = 'GET_CATEGORIES'

// action creators

const getCategories = categories => {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export const getCategoriesServer = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/categories')
    dispatch(getCategories(data))
  }
}

export const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
