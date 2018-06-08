'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { postNewProductServer } from '../store/product'
import ProductForm from './product-form'

const NewProductForm = (props) => {
  return (
    <ProductForm
      formAction={props.postNewProduct}
      buttonAction='Add product'
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    postNewProduct: newProduct => dispatch(postNewProductServer(newProduct))
  }
}

export default connect(null, mapDispatchToProps)(NewProductForm)
