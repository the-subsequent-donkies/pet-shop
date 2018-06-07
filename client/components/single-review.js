'use strict'

import React from 'react'

const SingleReview = (props) => {
  console.log("inside single review: ", props.review)
  return (
    <div>
      <h3>{props.review.content}</h3>
    </div>
  )
}

export default SingleReview
