import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
//import "import the actions here named" from '../store'

class ProductForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      inventory: 0,
      price: 0,
      imgUrl: '',
      description: '',
      fireRedirect: false
    }
    this.props.get(this.match.params.productId)
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
      description: this.state.description,
    }
    if (!this.props.selectedProduct) {
      this.props.post(newProduct)
    } else {
      this.props.put(newProduct)
    }
    this.setState({ fireRedirect: true })
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
          <input type='text' name='imgurl' value={this.state.imgUrl} placeholder='upload image'>
          </input>
          <button type='submit'>
          </button>
        </form>
        {this.state.fireRedirect && (<Redirect to={'/products'} />)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedProduct: state.selectedProduct
})

const mapDispatchToProps = (dispatch) => ({
  put: (product) => dispatch(updateProductServer(newProduct)),
  post: (newProduct) => dispatch(postNewProductServer(newProduct)),
  get: (selectedProduct) => dispatch(getSingleProductServer(selectedProduct))

})

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)
