const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('Order', {
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
