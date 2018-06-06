'use strict'

import React from 'react'

const IndividualProduct = (props) => {
  const { product } = props
  return (
    <div id='product-badge' style={{ width: '25%' }}>
      <div id='badge-img-bound'>
        <img id='badge-img' src={product.imgUrl} alt={product.name} />
      </div>
      <div id='badge-body'>
        <h3>{product.name}</h3>
        <p><strong>Price:</strong> {product.price} <strong>Inventory:</strong> {product.inventory}</p>
      </div>
    </div>
  )
}

export default IndividualProduct
