'use strict'

import React, { Component } from 'react'
import IndividualProduct from './individual-product'

const tempData = [
  {
    "id": "1",
    "name": "Bone",
    "inventory": "4",
    "price": "2.50",
    "imgUrl": "https://i.imgur.com/zzD13aO.jpg",
    "description": "this is a fun chew toy for dogs"
  },
  {
    "id": "2",
    "name": "scratch post",
    "inventory": "6",
    "price": "22.50",
    "imgUrl": "https://i.imgur.com/jI1kMrK.jpg",
    "description": "Cats will scratch this"
  },
  {
    "id": "3",
    "name": "fake mouse",
    "inventory": "9",
    "price": "5.00",
    "imgUrl": "https:/i.imgur.com/dQ7u2Wg.jpg",
    "description": "Fake Mouse from the failing Meowyork times"
  },
  {
    "id": "4",
    "name": "Hamster wheel",
    "inventory": "9",
    "price": "7.50",
    "imgUrl": "https://i.imgur.com/fFptBSA.jpg",
    "description": "you spin my head right rond"
  }
]

export default class ProductList extends Component {

  render() {
    return (
      <div id='product-list'>
        {tempData.map(product => <IndividualProduct product={product} />)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}
