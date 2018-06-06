'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import IndividualProduct from './individual-product'
import { getProductsServer } from '../store/product'

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.props.getProductsServer()
  }


  render() {
    return (
      <div id='product-list'>
        {this.props.products.map(product => <IndividualProduct product={product} key={product.id} />)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToPros = dispatch => {
  return {
    getProductsServer: () => dispatch(getProductsServer())
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(ProductList)
