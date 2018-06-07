'use strict'

import React from 'react'
import { Link } from 'react-router-dom'

const IndividualProduct = (props) => {
  const { product } = props
  return (
    <div id='product-badge' style={{ width: '23%' }}>
      <div id='badge-img-bound'>
        <img id='badge-img' src={product.imgUrl} alt={product.name} />
      </div>
      <div id='badge-body'>
        <Link to={`/products/${product.id}`} key={product.id}>
          <h3>{product.name}</h3>
        </Link>
        <strong>Price:</strong> {product.price} <strong>Inventory:</strong> {product.inventory}
        <p style={{ marginTop: '0.5rem' }}>{product.description}</p>
      </div>
    </div>
  )
}

export default IndividualProduct
