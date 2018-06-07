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
      inventory: '',
      price: '',
      imgUrl: '',
      description: '',
      fireRedirect: false
    }
    if (!this.props.action === 'newproduct') {
      this.props.get(this.props.selectedProduct.id)
        .then((select) => { console.log(select) })
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
    if (this.props.action === 'newproduct') {
      this.props.post(newProduct)
    } else {
      console.log(this.props)
      newProduct.id = this.props.match.params.productId
      this.props.put(newProduct)
    }
    this.setState({ fireRedirect: true })
  }


  render() {
    console.log("in form")
    return (
      <div className='product-form'>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <div className='form-group row'>
            <label className='col-sm-2 col-form-label'>Name</label>
            <div className='col-sm-8'>
              <input
                type='text'
                name='name'
                className='form-control'
                value={this.state.name}
                placeholder='Enter Product Name'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-2 col-form-label'>Inventory</label>
            <div className='col-sm-8'>
              <input
                type='text'
                name='inventory'
                className='form-control'
                value={this.state.inventory}
              />
            </div>
          </div>
          <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Price</label>
            <div className='col-sm-8'>
              <input
                type='text'
                name='price'
                className='form-control'
                value={this.state.price}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-2 col-form-label'>Description</label>
            <div className='col-sm-8'>
              <textarea
                name='description'
                className='form-control'
                value={this.state.description}
                cols='40'
                rows='5'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-2 col-form-label'>Image URL</label>
            <div className='col-sm-8'>
              <input
                type='text'
                name='imgUrl'
                className='form-control'
                value={this.state.imgUrl}
                placeholder='Upload an Image' />
              </div>
          </div>
          <button className='btn btn-primary' type='submit'>Add Product</button>
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
