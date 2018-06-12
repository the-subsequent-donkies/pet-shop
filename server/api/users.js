'use strict'

const router = require('express').Router()
const {User} = require('../db/models')
const checkAccess = require('./checkAccess')
module.exports = router

router.get('/', checkAccess, (req, res, next) => {
  User.findAll({
    attributes: ['id', 'name', 'address', 'email', 'isAdmin']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/userId', checkAccess, (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => res.json(user))
    .catch(next)
})

router.post('/', checkAccess, (req, res, next) => {
  const { name, email, isAdmin, address } = req.body
  User.create({ name, email, isAdmin, address })
    .then(user => res.json(user))
    .catch(next)
})

router.put('/:userId', checkAccess, (req, res, next) => {
  const { name, description, isAdmin } = req.body
  User.findById(req.params.userId)
    .then(user => user.update({ name, description, isAdmin }))
    .catch(next)
})

router.delete('/:userId', checkAccess, (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.destroy())
    .then(response => res.json(response))
    .catch(next)
})
