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


Category.search = async function (query) {
  const Product = require('./product')
  console.log('console.log the query', query)
  console.log('what is this?', this)
  console.log("what is product", Product)
  const result = await Category.findAll({
    where: {
      name: {
        [Sequelize.Op.iLike]: '%' + query + '%'
      },
    },
    include: [Product],


  })
  console.log("what is this result", result)
  return true
}

module.exports = Category
