'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleProductServer, updateProductServer } from '../store/product'
import ProductForm from './product-form'

class EditProductForm extends ProductForm {
  constructor (props) {
    super(props)
    this.props.getProduct(this.props.match.params.productId)
  }
  render () {
    const { name, inventory, price, imgUrl, description, id } = this.props.selectedProduct
    return (
      <ProductForm
        selectedProduct={{ name, inventory, price, imgUrl, description, id }}
        formAction={this.props.updateProduct}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.selectedProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: productId => dispatch(getSingleProductServer(productId)),
    updateProduct: updatedProduct => dispatch(updateProductServer(updatedProduct))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProductForm)
