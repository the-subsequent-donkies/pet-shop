const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('Category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Category
