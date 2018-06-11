'use strict'

import React from 'react'
import ReactStars from 'react-stars'
import { Link } from 'react-router-dom'
import { Segment, Header, Button } from 'semantic-ui-react'

const SingleReview = (props) => {
  return (
    <Segment attached>
      <div className='review-rating-row'>
        <ReactStars
          value={parseInt(props.review.stars, 10)}
          edit={false}
        />
        <Header
          as='h5'
          style={{ marginTop: '0.25rem', marginLeft: '1rem' }}
        >
          {props.review.user ? props.review.user.name : "Guest"}
        </Header>
      </div>
      {props.review.content}
      {(props.review.userId === props.loggedUser.id) &&
        (
          <div className='single-review-edit-row'>
            <Button
              as={Link}
              to={`../reviews/editreview/${props.review.id}`}
            >
              Edit
            </Button>
          </div>
        )}
    </Segment>
  )
}

export default SingleReview
