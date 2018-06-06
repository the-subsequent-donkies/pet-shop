import React, { Component } from 'react'
import axios from 'axios'
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
    return (
      <div className='product-form'>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <div>
            <input type='text' name='name' value={this.state.name} placeholder='Product Name' />
          </div>
          <div>
            <input type='text' name='inventory' value={this.state.inventory} placeholder='Inventory' />
          </div>
          <div>
            <input type='text' name='price' value={this.state.price} placeholder='Price' />
          </div>
          <div>
            <textarea name='description' value={this.state.description} placeholder='Type a brief description here' cols='40' rows='5' />
          </div>
          <div>
            <input type='text' name='imgUrl' value={this.state.imgUrl} placeholder='image url' />
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
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
