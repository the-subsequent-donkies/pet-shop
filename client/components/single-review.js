'use strict'

import React from 'react'

const SingleReview = (props) => {
  return (
    <div className='single-review-container'>
      <div>
        <h4>{props.review.content}</h4>
      </div>
      <div>
        <h5>Stars: {props.review.stars}</h5>
      </div>
      <div>
        <h5>By: {props.user.name} </h5>
      </div>
    </div>
  )
}

export default SingleReview
