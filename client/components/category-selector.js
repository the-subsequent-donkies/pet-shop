import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategoriesServer } from '../store/category'
import { getProductsByCategoryServer, getProductsServer } from '../store/product'
import { Redirect } from 'react-router-dom'
import history from '../history'
// refactor the redux store
// add a action to get the products by id
// use history to push the redirect
class CategorySelector extends Component {
  constructor(props) {
    super(props)
    this.props.getCategoriesServer()
    this.state = {
      category: '',
    }
  }

  handleClick = (event) => {
    if (this.state.category === '/') {
      history.push(`/`)
      this.props.getProductsServer()
    } else {
      history.push(`/categories/${this.state.category}`)
      this.props.getProductsByCategoryServer(this.state.category)
    }
  }

  handleChange = (event) => {
    this.setState({ category: event.target.value })
  }
  render() {

    return (
      <div className='category-selector' >
        <form onClick={this.handleClick} onChange={this.handleChange}>
          <select className='custom-select' >
            <option>Select a Category</option>
            <option value='/'>All Products</option>
            {this.props.categories.map(category => <option value={category.id} key={category.id} >{category.name}</option>)}
          </select>
        </form>
      </div>

    )
  }

}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesServer: () => dispatch(getCategoriesServer()),
    getProductsByCategoryServer: (categoryId) => dispatch(getProductsByCategoryServer(categoryId)),
    getProductsServer: () => dispatch(getProductsServer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelector)
  ;
