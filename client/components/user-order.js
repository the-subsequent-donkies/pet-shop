import React, {Component} from 'react';
import { connect } from 'react-redux';
import LineItem from './line-item';

const sampleOrder = {lineItems: [
  {
    id: 1,
    productId: 1,
    currentPrice: 2.5,
    quantity: 5
  },
  {
    id: 2,
    productId: 2,
    currentPrice: 3.5,
    quantity: 6
  },
  {
    id: 3,
    productId: 3,
    currentPrice: 2.55,
    quantity: 9
  },
  {
    id: 4,
    productId: 4,
    currentPrice: 5.55,
    quantity: 90
  }
]}

class Order extends Component {
  render() {
    return (
      <div>
        <h3>Shopping Cart</h3>
        <div className="user-order-body container">
          {
            this.props.order.lineItems.map((lineItem) => {
              return <LineItem key={lineItem.id} lineItem={lineItem} />
            })
          }
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    order: sampleOrder
  }
}

export default connect(mapState)(Order)
