'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
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
  },
  googleId: {
    type: Sequelize.STRING,
  }
})

module.exports = User
