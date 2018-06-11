import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategoriesServer } from '../store/category'
import { getProductsByCategoryServer, getProductsServer } from '../store/product'
import history from '../history'
import { Form, Select } from 'semantic-ui-react'

class CategorySelector extends Component {
  constructor(props) {
    super(props)
    this.props.getCategoriesServer()
    this.state = {
      category: '',
    }

  }

  handleChange = async (event, data) => {
    await this.setState({ category: data.value })
    if (this.state.category === '/') {
      await this.props.getProductsServer()
      history.push(`/`)
    } else {
      await this.props.getProductsByCategoryServer(this.state.category)
      history.push(`/categories/${this.state.category}`)
    }
  }

  render() {
    const categoryOptions = []
    if (this.state.category !== '') {
      categoryOptions.push({
        text: 'All Products',
        value: '/',
      })
    }
    this.props.categories.forEach(category => {
      categoryOptions.push({
        key: category.id,
        text: category.name,
        value: category.id,
      })
    })

    return (
      <Form>
        <Form.Field
          as={Select}
          placeholder='Select a Category'
          options={categoryOptions}
          onChange={this.handleChange}
          value={this.state.category}
        />
      </Form>
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
