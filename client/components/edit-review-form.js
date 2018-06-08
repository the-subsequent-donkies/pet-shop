'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleReviewServer, updateReviewServer } from '../store/reviews'
import ReviewForm from './review-form'

class EditReviewForm extends Component {
  constructor(props) {
    super(props)
    this.props.getReview(this.props.reviewId)
  }

  render() {
    return (
      <ReviewForm content={this.props.content} stars={this.props.stars} formAction={this.props.updateReview} />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getReview: reviewId => dispatch(getSingleReviewServer(reviewId)),
    updateReview: updatedReview => dispatch(updateReviewServer(updatedReview))
  }
}

export default connect(null, mapDispatchToProps)(EditReviewForm)
