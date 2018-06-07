'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import IndividualProduct from './individual-product'
import { getProductsServer, getProductsByCategoryServer } from '../store/product'

class ProductList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

    if (Object.keys(this.props.match.params).length < 1) {
      this.props.getProductsServer()
    } else {
      this.props.getProductsByCategoryServer(this.props.match.params.categoryId)
    }
  }

  render() {
    let products
    if (Object.keys(this.props.match.params).length < 1) {
      products = this.props.products.allProducts
    } else {
      products = this.props.products.productsByCategory
    }
    if (!products) {
      products = []
    }
    return (
      <div id='product-list'>
        {products.map(product => <IndividualProduct product={product} key={product.id} />)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user,
    allProducts: state.products.allProducts
  }
}

const mapDispatchToPros = dispatch => {
  return {
    getProductsServer: () => dispatch(getProductsServer()),
    getProductsByCategoryServer: (categoryId) => dispatch(getProductsByCategoryServer(categoryId))

  }
}

export default connect(mapStateToProps, mapDispatchToPros)(ProductList)
