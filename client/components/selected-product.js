'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleProductServer } from '../store/product'
import { getFilteredReviewsServer } from '../store/reviews'
import SingleReview from './single-review'
import NewReviewForm from './new-review-form'
import { Segment, Header, Image } from 'semantic-ui-react'

class SelectedProduct extends Component {
  constructor(props) {
    super(props)
    this.props.getSingleProduct(this.props.match.params.productId)
    this.props.getFilteredReviews(this.props.match.params.productId)
  }

  render() {
    const { product, reviews, user } = this.props
    return (
      <div className='home-wrapper'>
        <div className='center-container'>
          <Segment
            padded
            attached='top'
          >
            <Header
              as='h1'
              style={{ marginBottom: '0.25rem' }}
            >
              {product.name}
            </Header>
            <div className='selected-product-img-bound'>
              <Image
                src={product.imgUrl}
                className='selected-product-img'
              />
            </div>
            <div className='selected-product-content'>
              {product.description}
              <Header
                as='h3'
                style={{ marginTop: '1.25rem', marginBottom: '0' }}
              >
                Price: ${product.price}
              </Header>
              <Header
                as='h4'
                style={{ marginTop: '0' }}
              >
                Inventory: {product.inventory}
              </Header>
            </div>
            <NewReviewForm />
          </Segment>
          {reviews && (
            reviews.map((review) => {
              return (
                <SingleReview
                  review={review}
                  key={review.id}
                  user={review.user}
                  loggedUser={user}
                />)
            }))
          }
          <Segment attached='bottom' />
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
