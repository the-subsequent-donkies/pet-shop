'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux';

class ReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      stars: 0,
      product: {},
      user: {}
    }
  }

  // componentDidMount = () => {
  //   this.setState({
  //     product: this.props.product,
  //     user: this.props.user
  //   })
  // }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      product: this.props.product,
      user: this.props.user
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.invokeSubmit()
  }

  invokeSubmit = async () => {
    const review = { ...this.state }
    await this.props.formAction(review)
  }

  render() {
    return (
      <div>
        <div>
          <h2>Add Review:</h2>
        </div>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <div>
            <textarea name='content' value={this.state.content} cols='40' rows='5' placeholder='Add your review' />
          </div>
          <div>
            <input type='radio' id='star1' name='stars' value='1' />
            <input type='radio' id='star2' name='stars' value='2' />
            <input type='radio' id='star3' name='stars' value='3' />
            <input type='radio' id='star4' name='stars' value='4' />
            <input type='radio' id='star5' name='stars' value='5' />
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
