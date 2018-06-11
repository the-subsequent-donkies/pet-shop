'use strict'

import React, { Component } from 'react'
import history from '../history'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'

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
    this.invokeSubmit(event.target)
  }

  invokeSubmit = async (form) => {
    const product = { ...this.state }
    const productId = await this.props.formAction(product)
    history.push(`/products/${productId}`)
  }

  render() {
    const {
      name,
      inventory,
      price,
      imgUrl,
      description,
    } = this.state

    return (
      <div className='custom-form'>
        <Form
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        >
          <Form.Field
            name='name'
            control={Input}
            label='Name'
            placeholder='Enter Product Name'
            value={name}
          />
          <Form.Field
            name='inventory'
            control={Input}
            label='Inventory'
            placeholder='Set Inventory'
            value={inventory}
          />
          <Form.Field
            name='price'
            control={Input}
            label='Price'
            placeholder='Set Price'
            value={price}
          />
          <Form.Field
            name='description'
            control={TextArea}
            label='Description'
            placeholder='Add a Description'
            value={description}
            autoHeight
          />
          <Form.Field
            name='imgUrl'
            control={Input}
            label='Image URL'
            placeholder='Upload an Image'
            value={imgUrl}
          />
          <Form.Field
            control={Button}
            type='submit'
            content={this.props.buttonAction}
          />
        </Form>
      </div>
    )
  }
}

export default ProductForm
