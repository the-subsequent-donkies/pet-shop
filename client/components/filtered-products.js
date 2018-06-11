
import React, { Component } from 'react'
import { connect } from 'react-redux'
import IndividualProduct from './individual-product'
import { getProductsByCategoryServer } from '../store/product'
import CategorySelector from './category-selector'

class FilteredProducts extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getProductsByCategoryServer(this.props.match.params.categoryId)
  }
  render() {
    let products = this.props.filteredProducts
    return (
      <div>
        <CategorySelector />
        <div className='center-container'>
          {products.map(product => <IndividualProduct product={product} key={product.id} />)}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    filteredProducts: state.filteredProducts,
  }
}

const mapDispatchToPros = dispatch => {
  return {
    getProductsByCategoryServer: (categoryId) => dispatch(getProductsByCategoryServer(categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(FilteredProducts)
