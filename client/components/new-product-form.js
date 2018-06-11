'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { postNewProductServer } from '../store/product'
import { getCategoriesServer } from '../store/category'
import ProductForm from './product-form'

const NewProductForm = (props) => {
  return (
    <ProductForm
      formAction={props.postNewProduct}
      getCategories={props.getCategories}
      buttonAction='Add product'
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    postNewProduct: newProduct => dispatch(postNewProductServer(newProduct)),
    getCategories: () => dispatch(getCategoriesServer())
  }
}

export default connect(null, mapDispatchToProps)(NewProductForm)
