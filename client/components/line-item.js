import React, {Component} from 'react'
import {connect} from 'react-redux'

const tempProduct = {
  name: 'Bone',
  inventory: 4,
  price: 2.50,
  imgUrl: 'https://i.imgur.com/zzD13aO.jpg',
  description: 'This is a fun chew toy for dogs',
  category: 'dogs'
}

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
    this.setState({
      quantity: event.target.value
    })
  }

  handleUpdate = (event) => {
    // Call thunk to update lineitem (quantity)
    event.preventDefault()
    console.log('UPDATE LINEITEM PLACEHOLDER')
  }

  handleDelete = (event) => {
    // Call thunk to delete lineitem
    event.preventDefault()
    console.log('DELETE LINEITEM PLACEHOLDER')
  }

  render() {
    const lineItem = this.props.lineItem
    const product = this.props.product

    return (
      <div>
        <img src={product.imgUrl} />
        <h4>{product.name}</h4>
        <p>Price: ${product.price}</p>
        <form onChange={this.handleChange}>
          Quantity:
          <input
            name="quantity-input"
            className="form-control"
            type="text"
            value={this.state.quantity}
          />
          <button onClick={this.handleUpdate}>Update</button>
          <button onClick={this.handleDelete}>Delete</button>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    product: tempProduct //state.order.lineItem.product
  }
}

export default connect(mapState)(LineItem)

