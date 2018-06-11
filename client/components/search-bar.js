import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategoriesServer } from '../store/category'
import { getProductsByCategoryServer, getProductsServer } from '../store/product'
import history from '../history'
import { Button, Form, Input } from 'semantic-ui-react'
// map state to props and dispatch to props and go from there
class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ""
    }
  }

  handleChange = (evt) => {
    console.log(" event target value in handle change", evt.target.value)
    this.setState(evt.target.value)

  }

  handleSubmit = () => {
    // get the value from local state and dispatch the action that get the proper data

  }

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
      >
        <Form.Field
          control={Input}
          placeholder='Search'
          onChange={this.handleChange}
        />
        <Form.Field
          type='Submit'
          control={Button}
          content="Submit"
        />
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesServer: () => dispatch(getCategoriesServer()),
    getProductsByCategoryServer: (categoryId) => dispatch(getProductsByCategoryServer(categoryId)),
    getProductsServer: () => dispatch(getProductsServer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)

