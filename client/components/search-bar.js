import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchProductsServer } from '../store/product'
import IndividualProduct from './individual-product'
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
    let stateUpdateObj = { search: evt.target.value }
    this.setState(stateUpdateObj)

  }

  handleSubmit = () => {
    const query = `?search=${this.state.search}`
    this.props.searchProductsServer(query)
    // here we want to build a query string
    // first we want to build a query string that looks like this '?search=+this.state.search
  }

  render() {
    console.log("what are my props", this.props)
    let products = this.props.products
    return (
      <div>
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


        <div className='center-container'>
          {products.map(product => <IndividualProduct product={product} key={product.id} />)}
        </div>

      </div>
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
    searchProductsServer: (query) => dispatch(searchProductsServer(query)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)

