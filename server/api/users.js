'use strict'

const router = require('express').Router()
const {User} = require('../db/models')
const checkAccess = require('./checkAccess')
module.exports = router

router.get('/', checkAccess, (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})
