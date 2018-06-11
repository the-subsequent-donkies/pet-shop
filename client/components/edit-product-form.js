'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleProductServer, updateProductServer } from '../store/product'
import { getCategoriesServer } from '../store/category'
import ProductForm from './product-form'

class EditProductForm extends Component {
  constructor (props) {
    super(props)
    this.props.getProduct(this.props.match.params.productId)
  }
  render () {
    const {
      name, inventory, price, imgUrl, description, id
    } = this.props.selectedProduct
    return (
      <ProductForm
        name={name}
        inventory={inventory}
        price={price}
        imgUrl={imgUrl}
        description={description}
        id={id}
        formAction={this.props.updateProduct}
        getCategories={this.props.getCategories}
        buttonAction='Save changes'
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
    updateProduct: updatedProduct => dispatch(updateProductServer(updatedProduct)),
    getCategories: () => dispatch(getCategoriesServer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProductForm)
