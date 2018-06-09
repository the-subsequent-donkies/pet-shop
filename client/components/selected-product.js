'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleProductServer } from '../store/product'
import { getFilteredReviewsServer } from '../store/reviews'
import SingleReview from './single-review'
import NewReviewForm from './new-review-form'

class SelectedProduct extends Component {
  constructor(props) {
    super(props)
    this.props.getSingleProductServer(this.props.match.params.productId)
    this.props.getFilteredReviewsServer(this.props.match.params.productId)
  }

  render() {
    return (
      <div className='selected-product-container'>
        <h1>{this.props.product.name}</h1>
        <div className='selected-product-img-bound'>
          <img className='selected-product-img' src={this.props.product.imgUrl} />
        </div>
        <p>{this.props.product.description}</p>
        <div>
          <h2>Price: {this.props.product.price}</h2>
          <h2>Inventory: {this.props.product.inventory}</h2>
        </div>
        <div className='reviews-condensed'>
          <div>
            <NewReviewForm />
          </div>
          <div>
            <h2>Reviews:</h2>
          </div>
          {this.props.reviews && (
            this.props.reviews.map((review) => {
              return (<SingleReview review={review} key={review.id} userId={review.userId} user={this.props.user} />)
            }))
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.selectedProduct,
    reviews: state.reviews,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProductServer: (selectedProductId) => dispatch(getSingleProductServer(selectedProductId)),
    getFilteredReviewsServer: (selectedProductId) => dispatch(getFilteredReviewsServer(selectedProductId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedProduct)
