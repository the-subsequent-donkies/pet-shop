'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import { deleteLineitemServer, updateLineitemServer, getLocalOrderServer } from '../store/order'
import { Segment, Image, Header, Form, Input, Button, Grid } from 'semantic-ui-react'

class LineItem extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
  }

  async componentDidMount() {
    const quant = this.props.lineItem.quantity
    await this.setState({
      quantity: quant
    })
  }

  handleChange = (event) => {
    if (typeof event.target.value !== 'number') {
      this.setState({ quantity: 0 })
    }
    this.setState({
      quantity: +event.target.value
    })
  }

  handleUpdate = async (event) => {
    // Call thunk to update lineitem (quantity)
    event.preventDefault()
    if (this.state.quantity === 0) {
      await this.props.deleteItem(this.props.lineItem.id)
    } else {
      await this.props.updateItem(this.props.lineItem.id, this.state.quantity)
      this.props.getOrder(this.props.lineItem.orderId)
    }
  }

  handleDelete = async (event) => {
    // Call thunk to delete lineitem
    event.preventDefault()
    await this.props.deleteItem(this.props.lineItem.id)
  }

  render() {
    const { product } = this.props.lineItem

    return (
      <Segment
        padded
        style={{ minHeight: '13rem' }}
      >
        <div
          className='line-item-img-bound'
        >
          <Image
            src={product.imgUrl}
            size='tiny'
          />
        </div>
        <Header
          as='h3'
          style={{ marginTop: '0', marginBottom: '0.25rem', paddingTop: '0' }}
        >
          {product.name}
        </Header>
        <p>{product.description}</p>
        <Grid
          columns={2}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            clear: 'both'
          }}
        >
          <Grid.Column>
            <Grid
              columns={3}
              style={{ marginLeft: '3rem' }}
            >
              <Grid.Column>
                <Header
                  as='h4'
                >
                  Quantity: {this.props.lineItem.quantity}
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header
                  as='h4'
                >
                Price: ${product.price}
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header
                  as='h4'
                >
                  Subtotal: ${(this.props.lineItem.quantity * product.price).toFixed(2)}
                </Header>
              </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column>
            <Form
              onChange={this.handleChange}
              style={{ float: 'right' }}
            >
              <Form.Group>
                <Form.Field
                  name='quantity-input'
                  control={Input}
                  value={this.state.quantity}
                />
                <Form.Field
                  as={Button}
                  onClick={this.handleUpdate}
                  content='Update'
                  style={{ margin: '0 .5rem' }}
                />
                <Form.Field
                  as={Button}
                  onClick={this.handleDelete}
                  content='Delete'
                  style={{ marginRight: '.5rem' }}
                />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    getOrder: (id) => dispatch(getLocalOrderServer(id)),
    deleteItem: (id) => dispatch(deleteLineitemServer(id)),
    updateItem: (id, quantity) => dispatch(updateLineitemServer(id, quantity))
  }
}

export default connect(null, mapDispatch)(LineItem)

