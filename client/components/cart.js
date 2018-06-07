'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import IndividualProduct from './individual-project'

let currentCart = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

export default class Cart extends Component {
  constructor() {
    super()
    this.state = {
      items: currentCart
    }
  }

  handleClick = (event) => {
    event.preventDefault()
    let newCart = this.state.items.filter(item => {
      return item.id !== event.target.key
    })
    localStorage.setItem('items', JSON.stringify(newCart))
    this.setState({
      items: newCart
    })
  }

  render() {
    return (
      <div>
        {this.state.items.map(item => {
          <div className='product-list'>
            <IndividualProduct product={item} key={item.id} />
            <button key={item.id} onClick={this.handleClick}>Remove</button>
          </div>
        })}
      </div>
    )
  }

}

// localStorage.setItem('items', JSON.stringify(currentCart));
// const data = JSON.parse(localStorage.getItem('items'));
// itemsArray.push(input.value);
// localStorage.setItem('items', JSON.stringify(itemsArray)
