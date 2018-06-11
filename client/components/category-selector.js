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

  handleClick = async (event) => {
    await this.setState({ category: event.target.value })
    if (this.state.category === "") {
      let currentLocation = history.location.pathname
      history.push(currentLocation)
    } else if (this.state.category === '/') {
      this.props.getProductsServer()
      history.push(`/`)
    } else {
      this.props.getProductsByCategoryServer(this.state.category)
      history.push(`/categories/${this.state.category}`)
    }
  }

  render() {
    return (
      <div className='category-selector' >
        <form onSubmit={(event) => event.preventDefault()} onClick={this.handleClick}>
          <select className='custom-select' >
            <option value='' selected={'' === this.state.category && 'selected'} > Select a Category</option>
            <option value='/' selected={'/' === this.state.category && 'selected'}>All Products</option>
            {this.props.categories.map(category => <option value={category.id} key={category.id} selected={category.id === this.state.category && 'selected'} >{category.name}</option>)}
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
