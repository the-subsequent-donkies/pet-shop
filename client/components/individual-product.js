'use strict'

import React from 'react'

const IndividualProduct = (props) => {
  const { product } = props
  return (
    <div>
      <img src={product.imgUrl} alt={product.name} width='400px' />
      <div>
        <h1>{product.name}</h1>
        <p><strong>Price:</strong> {product.price} <strong>Inventory:</strong> {product.inventory}</p>
      </div>
    </div>
  )
}

export default IndividualProduct
