'use strict'

import React from 'react'

import SomeForm from '../some-path'

import { someClassName } from './some-css-file.css'

someClassName === "someClassName-coauh3tanetount"
<div className={someClassName}/>

:local(.someClassName) {
  color: blue;
}

import {RejectButton} from 'cool-ui-kit'

<RejectButton/>

import styled from 'styled-components'

const RejectButton = styled`
  border: 1px solid red;
  background: red;
  color: white;
`

const RejectButton = (props) => {
  return <button
    {...props}
    style={{
      border: '1px solid red',
      background: 'red',
      fontSize: '20px',
      color: 'white'
    }}
  />
}

const RedForm = {color: 'red'}

<form style={RedForm}>


const IndividualProduct = (props) => {
  const { product } = props
  // REVIEW: never use #id for styling
  // REVIEW: inline vs css styling
  //
  // .product-badge {
  //
  // }
  //
  // .badge-img-bound {
  //
  // }
  return (
    <div className='product-badge' style={{ width: '23%' }}>
      <div className='badge-img-bound'>
        <img className='badge-img' src={product.imgUrl} alt={product.name} />
      </div>
      <div className='badge-body'>
        <SomeForm/>
        <h3>{product.name}</h3>
        <strong>Price:</strong> {product.price} <strong>Inventory:</strong> {product.inventory}
        <p style={{ marginTop: '0.5rem' }}>{product.description}</p>
      </div>
    </div>
  )
}

export default IndividualProduct
