'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { addLineitemServer } from '../store/order';
import { connect } from 'react-redux';
import { Card, Image, Button } from 'semantic-ui-react'

import io from 'socket.io-client'
const socket = io(window.location.origin)
import {socketEmit} from '../socket'

class IndividualProduct extends Component {
  constructor(props) {
    super(props)
  }

  handleAdd = async (evt) => {
    evt.preventDefault()
    await this.props.addToOrder(this.props.orderId, this.props.product)
    socketEmit('ADD_PRODUCT_CART', {userId: this.props.userId}, socket)
  }

  render() {
    const { product } = this.props
    return (
      <Card
        fluid
        raised
      >
        <Card.Content>
          <div className="product-list-img-bound">
            <Image
              src={product.imgUrl}
              size="small"
            />
          </div>
          <Card.Header
            as={Link}
            to={`/products/${product.id}`}
            style={{ margin: '1rem 0 .5rem 0' }}
          >
            {product.name}
          </Card.Header>
          <Card.Meta>
            <strong>Price $</strong>{product.price} - <strong>Inventory</strong> {product.inventory}
          </Card.Meta>
          <Card.Description
            style={{ clear: 'none' }}
          >
            {product.description}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            as={Link}
            content='Edit'
            to={`/products/${product.id}/edit`}
          />
          <Button
            content="Add to Cart"
            onClick={this.handleAdd}
            style={{ float: 'right' }}
          />
          </div>
        </Card.Content>
      </Card>
    )
  }
}

const mapState = (state) => {
  return {
    orderId: state.order.id,
    userId: state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    addToOrder: (orderId, product) => dispatch(addLineitemServer(orderId, product))
  }
}

export default connect(mapState, mapDispatch)(IndividualProduct)
