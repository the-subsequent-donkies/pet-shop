'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { addLineitemServer } from '../store/order';
import { connect } from 'react-redux';
import { Card, Image, Button } from 'semantic-ui-react'

class IndividualProduct extends Component {

  handleAdd = async (evt) => {
    evt.preventDefault()
    await this.props.addToOrder(this.props.orderId, this.props.product)
  }

  render() {
    const { product } = this.props
    return (
      <Card
        fluid
      >
        <Card.Content>
          <div className='badge-img-bound'>
          <Image
            src={product.imgUrl}
            size='small'
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
          <Button
            content='Add to Cart'
            onClick={this.handleAdd}
            style={{ float: 'right' }}
          />
        </Card.Content>
      </Card>
    )
  }
}

const mapState = (state) => {
  return {
    orderId: state.order.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    addToOrder: (orderId, product) => dispatch(addLineitemServer(orderId, product))
  }
}

export default connect(mapState, mapDispatch)(IndividualProduct)
