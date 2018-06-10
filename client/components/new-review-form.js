'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { postNewReviewServer } from '../store/reviews'
import ReviewForm from './review-form'

const NewReviewForm = (props) => {
  return (
    <ReviewForm formAction={props.postNewReview} actionProp="post" />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    postNewReview: newReview => dispatch(postNewReviewServer(newReview))
  }
}

export default connect(null, mapDispatchToProps)(NewReviewForm)
