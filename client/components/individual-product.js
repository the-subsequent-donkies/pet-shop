'use strict'

import React from 'react'

const IndividualProduct = (props) => {
  const { product } = props
  return (
    <div id='product-badge' style={{ width: '25%' }}>
      <div id='badge-img' style={{ width: '25%'}}>
        <img id='badge-img' src={product.imgUrl} alt={product.name} />
      </div>
      <div className='card-body'>
        <h1>{product.name}</h1>
        <p><strong>Price:</strong> {product.price} <strong>Inventory:</strong> {product.inventory}</p>
      </div>
    </div>
  )
}

export default IndividualProduct
