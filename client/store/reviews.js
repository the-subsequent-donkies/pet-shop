import axios from 'axios'
import history from '../history'

//action types
export const GET_REVIEWS = 'GET_REVIEWS'
export const GET_FILTERED_REVIEWS = 'GET_FILTERED_REVIEWS'
export const POST_NEW_REVIEW = 'POST_NEW_REVIEW'
export const UPDATE_REVIEW = 'UPDATE_REVIEW'
export const GET_SINGLE_REVIEW = 'GET_SINGLE_REVIEW'

// action creators
const postNewReview = (newReview) => {
  return {
    type: POST_NEW_REVIEW,
    newReview
  }
}

const updateReview = (review) => {
  return {
    type: UPDATE_REVIEW,
    review
  }
}
const getReviews = (review) => {
  return {
    type: GET_REVIEWS,
    review
  }
}

const getFilteredReviews = (filteredReviews) => {
  return {
    type: GET_FILTERED_REVIEWS,
    filteredReviews
  }
}

const getSingleReview = (review) => {
  return {
    type: GET_SINGLE_REVIEW,
    review
  }
}

// thunk creators
export const postNewReviewServer = (newReview) => {
  return async (dispatch) => {
    const { data } = await axios.post(`/api/reviews`, newReview)
    dispatch(postNewReview(data))
  }
}

export const updateReviewServer = (review) => {
  console.log('updatereviewserver:', review)
  return async (dispatch) => {
    const { data } = await axios.put(`/api/reviews/editreview/${review.reviewId}`, review)
    dispatch(updateReview(data))
  }
}

export const getReviewsServer = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/reviews`)
    dispatch(getReviews(data))
  }
}

export const getFilteredReviewsServer = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/reviews/${id}`)
    dispatch(getFilteredReviews(data))
  }
}

export const getSingleReviewServer = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/reviews/editreview/${id}`)
    dispatch(getSingleReview(data))
  }
}

// reducers

export const reviewsReducer = (state = [], action) => {
  console.log('inside review reducer')
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    case POST_NEW_REVIEW:
      return [...state, action.newReview]
    case UPDATE_REVIEW:
      const otherReviews = state.filter(review => review.id !== action.review.id)
      return [...otherReviews, action.review]
    case GET_FILTERED_REVIEWS:
      return action.filteredReviews
    default:
      return state
  }
}

export const selectedReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_REVIEW:
      return action.review
    default:
      return state
  }
}
