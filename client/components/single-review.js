'use strict'

import React from 'react'

const SingleReview = (props) => {
  return (
    <div className='single-review-container'>
      <div>
        <h3>Reviews:</h3>
      </div>
      <div>
        <h3>{props.review.content}</h3>
      </div>
      <div>
        <h3>Stars: {props.review.stars}</h3>
      </div>
    </div>
  )
}

export default SingleReview
