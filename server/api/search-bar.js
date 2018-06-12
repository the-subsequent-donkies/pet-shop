const router = require('express').Router()
const { Category, Product } = require('../db/models')
const checkAccess = require('./checkAccess')
const Sequelize = require('sequelize')
module.exports = router

// from front end build a query string that looks liek this:
// category='someCategory'
// product = 'someProd'


router.get('/', async (req, res, next) => {
  try {
    const productResult = await Product.search(req.query.search)
    const categoryResult = await Category.search(req.query.search)
    const foundProducts = [...productResult, ...categoryResult[0].products]
    const foundProductsNoDuplicates = []
    const setOfUniqueIds = new Set()
    foundProducts.forEach(product => {
      if (!setOfUniqueIds.has(product.id)) {
        setOfUniqueIds.add(product.id)
        foundProductsNoDuplicates.push(product)
      }
    })
    res.json(foundProductsNoDuplicates)
  } catch (err) {
    next(err)
  }
})
