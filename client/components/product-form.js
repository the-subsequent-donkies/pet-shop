'use strict'

import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { postNewProductServer, getSingleProductServer, updateProductServer } from '../store'

class ProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      inventory: 0,
      price: 0.00,
      imgUrl: '',
      description: '',
      fireRedirect: false
    }
    if (!this.props.action === 'newproduct') {
      this.props.get(this.props.selectedProduct.id)
    }
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })

  }

  handleSubmit = (event) => {
    event.preventDefault()
    const newProduct = {
      name: this.state.name,
      inventory: this.state.inventory,
      price: this.state.price,
      imgUrl: this.state.imgUrl,
      description: this.state.description
    }
    if (Object.keys(this.props.selectedProduct).length === 0) {
      this.props.post(newProduct)
    } else {
      newProduct.id = this.props.match.params.productId
      this.props.put(newProduct)
    }
    this.setState({ fireRedirect: true })
  }

  render() {
    return (
      <div className='product-form'>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <input type='text' name='name' value={this.state.name} placeholder='Enter Product Name' />
          <input type='text' name='inventory' value={this.state.inventory} placeholder='Enter Inventory Amount' />
          <input type='text' name='price' value={this.state.price} placeholder='Price' />
          <textarea name='description' value={this.state.description} placeholder='' cols='40' rows='5' />
          <input type='text' name='imgUrl' value={this.state.imgUrl} placeholder='upload image' />
          <button type='submit'>Add Product</button>
        </form>
        {this.state.fireRedirect && (<Redirect to={'/'} />)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedProduct: state.selectedProduct
})

const mapDispatchToProps = (dispatch) => ({
  put: (product) => dispatch(updateProductServer(product)),
  post: (newProduct) => dispatch(postNewProductServer(newProduct)),
  get: (selectedProductId) => dispatch(getSingleProductServer(selectedProductId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)
