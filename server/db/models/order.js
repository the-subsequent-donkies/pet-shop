'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Initialized', 'Processing', 'Cancelled', 'Completed'),
    defaultValue: 1
  },
  submittedAt: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

module.exports = Order
