const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineItem', {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
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
