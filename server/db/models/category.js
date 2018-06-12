'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})


Category.search = function (query) {
  const Product = require('./product')
  return this.findAll({
    where: {
      name: {
        [Sequelize.Op.iLike]: '%' + query + '%'
      },
    },
    include: [Product],
  })
}

module.exports = Category
