'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getSingleProductServer } from '../store/product'
import { getFilteredReviewsServer } from '../store/reviews'
import SingleReview from './single-review'
import NewReviewForm from './new-review-form'
import { addLineitemServer } from '../store/order';

import io from 'socket.io-client'
const socket = io(window.location.origin)
import {socketEmit} from '../socket'

class SelectedProduct extends Component {
  constructor(props) {
    super(props)
    this.props.getSingleProduct(this.props.match.params.productId)
    this.props.getFilteredReviews(this.props.match.params.productId)
    socketEmit('SELECTED_PRODUCT_VIEW', {userId: this.props.user.id}, socket)
  }

  handleAdd = async (evt) => {
    evt.preventDefault()
    await this.props.addToOrder(this.props.orderId, this.props.product)
  }

  render() {
    const { product, reviews, user } = this.props
    return (
      <div className="home-wrapper">
        <div className="center-container">
          <Segment.Group raised>
            <Segment padded>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Header
                  as="h1"
                  style={{ marginBottom: '0.25rem' }}
                >
                  {product.name}
                </Header>
                <Button
                  as={Link}
                  content="Edit"
                  to={`/products/${product.id}/edit`}
                />
              </div>
              <div className="selected-product-img-bound">
                <Image
                  src={product.imgUrl}
                  className="selected-product-img"
                />
              </div>
              <div className="selected-product-content">
                {product.description}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '1.25rem'
                }}>
                  <div>
                    <Header
                      as="h3"
                      style={{ marginBottom: '0' }}
                    >
                      Price: ${product.price}
                    </Header>
                    <Header
                      as="h4"
                      style={{ marginTop: '0' }}
                    >
                      Inventory: {product.inventory}
                    </Header>
                  </div>
                  <Button
                    content="Add to Cart"
                    onClick={this.handleAdd}
                  />
                </div>
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
          </Segment.Group>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.selectedProduct,
    reviews: state.reviews,
    user: state.user,
    orderId: state.order.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: (selectedProductId) => dispatch(getSingleProductServer(selectedProductId)),
    getFilteredReviews: (selectedProductId) => dispatch(getFilteredReviewsServer(selectedProductId)),
    addToOrder: (orderId, product) => dispatch(addLineitemServer(orderId, product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedProduct)
