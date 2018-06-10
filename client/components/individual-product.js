'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { addLineitemServer } from '../store/order';
import { connect } from 'react-redux';

class IndividualProduct extends Component {
  handleAdd = async (evt) => {
    evt.preventDefault()
    await this.props.addToOrder(this.props.orderId, this.props.product)
  }

  render() {
    const { product } = this.props
    return (
      <div id="product-badge" style={{ width: '23%' }}>
        <div id="badge-img-bound">
          <img id="badge-img" src={product.imgUrl} alt={product.name} />
        </div>
        <div id="badge-body">
          <Link to={`/products/${product.id}`} key={product.id}>
            <h3>{product.name}</h3>
          </Link>
          <strong>Price:</strong> {product.price} <strong>Inventory:</strong> {product.inventory}
          <p style={{ marginTop: '0.5rem' }}>{product.description}</p>
          <button onClick={this.handleAdd}>Add To Cart</button>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    orderId: state.order.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    addToOrder: (orderId, product) => dispatch(addLineitemServer(orderId, product))
  }
}

export default connect(mapState, mapDispatch)(IndividualProduct)
