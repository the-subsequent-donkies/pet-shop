'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
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
    defaultValue: '../../images/default-product.jpg'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('inStock', 'outOfStock', 'unavailable')
  }
}, {
    hooks: {
      beforeCreate: product => {
        if (product.imgUrl === '') {
          product.imgUrl = '../../images/default-product.jpg'
        }
      }
    }
  })

const Category = require('./category')

Product.search = async function (query) {
  const result = await this.findAll({
    where: {
      name: {
        [Sequelize.Op.iLike]: '%' + query + '%'
      },
      status: 'inStock',
    },
    include: [{ model: Category }]
  })
  return result
}

module.exports = Product
