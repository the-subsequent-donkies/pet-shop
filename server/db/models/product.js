const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('Product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.ARRAY,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: '/public/images/default-product.jpg'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Product
