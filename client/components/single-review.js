'use strict'

import React from 'react'
import ReactStars from 'react-stars'
import { Link } from 'react-router-dom'

const SingleReview = (props) => {
  return (
    <div className='single-review-container'>
      <div>
        <h4>{props.review.content}</h4>
      </div>
      <div>
        <ReactStars value={parseInt(props.review.stars)} edit={false} />
      </div>
      <div>
        <h5>By: {props.review.user ? props.review.user.name : null} </h5>
      </div>
      {(props.review.userId === props.loggedUser.id) &&
        (
          <div>
            <Link to={`../reviews/editreview/${props.review.id}`}>
              <button type='submit'>Edit</button></Link>
          </div>
        )}
    </div>
  )
}

export default SingleReview
