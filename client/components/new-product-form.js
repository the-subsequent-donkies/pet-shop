'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postNewProductServer } from '../store'
import history from '../history'
import ProductForm from './product-form'

const NewProductForm = (props) => {
  return (
    <ProductForm />
  )
}
