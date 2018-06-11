const router = require('express').Router()
const { Category, Product } = require('../db/models')
const checkAccess = require('./checkAccess')
module.exports = router

// from front end build a query string that looks liek this:
// category='someCategory'
// product = 'someProd'


router.get('/', async (req, res, next) => {
  try {
    console.log('getting to the search route')
    // we will use the req.query.key ?
    console.log("what is my req.query", req.query)
    // assign req.query.state to a variable in the body
    // do a sequelize request for the query param
    // res.send the json needed
  } catch (err) {
    next(err)
  }
})