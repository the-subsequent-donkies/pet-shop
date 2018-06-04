const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('Review', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  stars: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false
  }
})

module.exports = Review
