const Sequelize = require('sequelize')
const db = require('../db')

const Order = define('Order', {
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  submittedAt: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

module.exports = Order
