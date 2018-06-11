
import React, { Component } from 'react'
import { connect } from 'react-redux'
import IndividualProduct from './individual-product'
import { getProductsServer } from '../store/product'

class AllProducts extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getProductsServer()
  }
  render() {
    let products = this.props.products
    return (

      <div id='product-list'>
        {products.map(product => <IndividualProduct product={product} key={product.id} />)}
      </div>

    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    products: state.products,
  }
}

const mapDispatchToPros = dispatch => {
  return {
    getProductsServer: () => dispatch(getProductsServer())
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(AllProducts)
