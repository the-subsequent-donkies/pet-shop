'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('line_item', {
  currentPrice: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = LineItem
