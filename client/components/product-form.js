import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { postNewProductServer, getSingleProductServer, updateProductServer } from '../store'
import history from '../history'

class ProductForm extends Component {
  constructor(props) {
    super(props)
    BROKEN
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
    this.invokeForm()
  }

  invokeForm = async (event) => {
    const newProduct = {
      name: this.state.name,
      inventory: this.state.inventory,
      price: this.state.price,
      imgUrl: this.state.imgUrl,
      description: this.state.description
    }
    if (Object.keys(this.props.selectedProduct).length === 0) {
      await this.props.post(newProduct)
      history.push('/')
    } else {
      newProduct.id = this.props.match.params.productId
      this.props.put(newProduct)
    }
  }

  render() {
    return (
      <div className='product-form'>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <input type='text' name='name' value={this.state.name} placeholder='Enter Product Name'>
          </input>
          <input type='text' name='inventory' value={this.state.inventory} placeholder='Enter Inventory Amount'>
          </input>
          <input type='text' name='price' value={this.state.price} placeholder='Price'>
          </input>
          <textarea name='description' value={this.state.description} placeholder='' cols='40' rows='5' />
          <input type='text' name='imgUrl' value={this.state.imgUrl} placeholder='upload image'>
          </input>
          <button type='submit'>
          </button>
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
