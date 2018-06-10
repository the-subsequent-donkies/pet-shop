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
    this.props.getSingleProduct(this.props.match.params.productId)
    this.props.getFilteredReviews(this.props.match.params.productId)
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
          {this.props.reviews && (
            this.props.reviews.map((review) => {
              return (<SingleReview review={review} key={review.id} user={review.user} loggedUser={this.props.user} />)
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
    getSingleProduct: (selectedProductId) => dispatch(getSingleProductServer(selectedProductId)),
    getFilteredReviews: (selectedProductId) => dispatch(getFilteredReviewsServer(selectedProductId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedProduct)
