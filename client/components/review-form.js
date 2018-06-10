'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactStars from 'react-stars'

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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      product: this.props.product,
      user: this.props.user
    })
  }

  handleClick = (event) => {
    this.setState({
      stars: event
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.invokeSubmit()
  }

  invokeSubmit = async () => {
    const updateReview = {
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
      await this.props.formAction(updateReview)
    }
  }

  render() {
    return (
      <div>
        <div>
          <h2>Add Review:</h2>
        </div>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
          <div>
            <textarea name='content' value={this.state.content} cols='40' rows='5' placeholder='Add your review' />
          </div>
          <div>
            <ReactStars value={parseInt(this.state.stars)} name='stars' onChange={this.handleClick} />
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
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
