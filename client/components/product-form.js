'use strict'

import React, { Component } from 'react'
import history from '../history'

class ProductForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      inventory: '',
      price: '',
      imgUrl: '',
      description: ''
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.name && nextProps.name !== prevState.name) {
      return {
        name: nextProps.name,
        inventory: nextProps.inventory,
        price: nextProps.price,
        imgUrl: nextProps.imgUrl,
        description: nextProps.description,
        id: nextProps.id
      }
    }
    return null
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.invokeSubmit()
  }

  invokeSubmit = async () => {
    const product = { ...this.state }
    const productId = await this.props.formAction(product)
    history.push(`/products/${productId}`)
  }

  render() {
    return (
      <div className='custom-form'>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <div className='form-group row'>
            <label className='col-sm-3 col-form-label'>Name</label>
            <div className='col-sm-9'>
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
            <label className='col-sm-3 col-form-label'>Inventory</label>
            <div className='col-sm-9'>
              <input
                type='text'
                name='inventory'
                className='form-control'
                value={this.state.inventory}
                placeholder='Set Inventory'
              />
            </div>
          </div>
          <div className='form-group row'>
          <label className='col-sm-3 col-form-label'>Price</label>
            <div className='col-sm-9'>
              <input
                type='text'
                name='price'
                className='form-control'
                value={this.state.price}
                placeholder='Set Price'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-3 col-form-label'>Description</label>
            <div className='col-sm-9'>
              <textarea
                name='description'
                className='form-control'
                value={this.state.description}
                cols='40'
                rows='5'
                placeholder='Add a Description'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-3 col-form-label'>Image URL</label>
            <div className='col-sm-9'>
              <input
                type='text'
                name='imgUrl'
                className='form-control'
                value={this.state.imgUrl}
                placeholder='Upload an Image' />
              </div>
          </div>
          <div className='button-row'>
            <button className='btn btn-primary' type='submit'>{this.props.buttonAction}</button>
          </div>
        </form>
      </div>
    )
  }
}

export default ProductForm
