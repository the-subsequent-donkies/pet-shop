const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('User', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  credentials: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = User
