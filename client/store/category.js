'use strict'

import axios from 'axios'

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const POST_NEW_CATEGORY = 'POST_NEW_CATEGORY'

const getCategories = categories => {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

const postCategory = category => {
  return {
    type: POST_NEW_CATEGORY,
    category
  }
}

//thunk creators

export const getCategoriesServer = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/categories')
    dispatch(getCategories(data))
  }
}

export const postCategoryServer = (category) => {
  return async dispatch => {
    const { data } = await axios.post('/api/categories', category)
    dispatch(postCategory(data))
  }
}

export const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    case POST_NEW_CATEGORY:
      return action.category
    default:
      return state
  }
}
