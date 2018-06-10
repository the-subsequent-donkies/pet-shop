'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleProductServer } from '../store/product'
import { getFilteredReviewsServer } from '../store/reviews'
import SingleReview from './single-review'
import NewReviewForm from './new-review-form'
import { Segment, Header, Image, Button } from 'semantic-ui-react'

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
            raised
            padded
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
                style={{ margin: '1.5rem 0.25rem 0.25rem 0.25rem' }}
              >
                Price: ${product.price}
              </Header>
              <Header
                as='h3'
                style={{ margin: '0.25rem' }}
              >
                Inventory: {product.inventory}
              </Header>
            </div>
            <NewReviewForm />
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
          </Segment>
        </div>
      </div>
    )
  }

  // render() {
  //   return (
  //     <div className='selected-product-container'>
  //       <h1>{this.props.product.name}</h1>
  //       <div className='selected-product-img-bound'>
  //         <img className='selected-product-img' src={this.props.product.imgUrl} />
  //       </div>
  //       <p>{this.props.product.description}</p>
  //       <div>
  //         <h2>Price: ${this.props.product.price}</h2>
  //         <h2>Inventory: {this.props.product.inventory}</h2>
  //       </div>
  //       <div className='reviews-condensed'>
  //         <div>
  //           <NewReviewForm />
  //         </div>
  //         {this.props.reviews && (
  //           this.props.reviews.map((review) => {
  //             return (<SingleReview review={review} key={review.id} user={review.user} loggedUser={this.props.user} />)
  //           }))
  //         }
  //       </div>
  //     </div>
  //   )
  // }
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
