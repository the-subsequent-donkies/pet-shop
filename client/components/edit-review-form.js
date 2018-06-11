'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleReviewServer, updateReviewServer } from '../store/reviews'
import ReviewForm from './review-form'

class EditReviewForm extends Component {
  constructor(props) {
    super(props)
    this.props.getReview(this.props.match.params.reviewId)
  }

  render() {
<<<<<<< HEAD
=======

>>>>>>> 0158a06ac8d80daecf365cd3934e174ce7cf327d
    return (
      <ReviewForm
        content={this.props.selectedReview.content}
        stars={this.props.selectedReview.stars}
        reviewId={this.props.selectedReview.id}
        user={this.props.user}
        formAction={this.props.updateReview}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedReview: state.selectedReview
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getReview: reviewId => dispatch(getSingleReviewServer(reviewId)),
    updateReview: updatedReview => dispatch(updateReviewServer(updatedReview))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditReviewForm)
