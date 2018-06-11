'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactStars from 'react-stars'
import history from '../history'
import { Form, TextArea, Button } from 'semantic-ui-react'

class ReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: this.props.content || '',
      stars: this.props.stars || 0,
      reviewId: '',
      product: this.props.product || {},
      user: this.props.user || {}
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.content && nextProps.reviewId !== prevState.reviewId) {
      return {
        content: nextProps.content,
        stars: nextProps.stars,
        reviewId: nextProps.reviewId
      }
    }
    return null
  }

  handleTextChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      product: this.props.product,
      user: this.props.user
    })
  }

  handleStarClick = (event) => {
    this.setState({
      stars: event
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.invokeSubmit()
    this.setState({
      content: '',
      stars: 0,
      reviewId: 0
    })
  }

  invokeSubmit = async () => {
    const updatedReview = {
      content: this.state.content,
      stars: this.state.stars,
      reviewId: this.state.reviewId
    }
    const newReview = {
      content: this.state.content,
      stars: this.state.stars,
      product: this.props.product,
      user: this.props.user
    }

    if (this.props.actionProp === 'post') {
      await this.props.formAction(newReview)
    } else {
      await this.props.formAction(updatedReview)
      history.push(`/products/${this.props.product.id}`)
    }
  }

  render() {

    const { content, stars } = this.state

    return (
      <Form
        onSubmit={this.handleSubmit}
      >
        <Form.Field
          name='content'
          control={TextArea}
          label='Leave your thoughts here'
          value={content}
          style={{ marginTop: '0.75rem' }}
          onChange={this.handleTextChange}
        />
        <div
          className='review-form-submit-row'
        >
          <Form.Field
            name='stars'
            control={ReactStars}
            label='Your rating'
            value={parseInt(stars, 10)}
            onChange={this.handleStarClick}
          />
          <Button
            type='submit'
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
          >
            Submit
          </Button>
        </div>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.selectedProduct,
    user: state.user
  }
}

export default connect(mapStateToProps, null)(ReviewForm)
