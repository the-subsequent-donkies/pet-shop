const router = require('express').Router()
const { Category, Product } = require('../db/models')
const checkAccess = require('./checkAccess')
const Sequelize = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const productResult = await Product.search(req.query.search)
    const categoryResult = await Category.search(req.query.search)
    if (![...productResult, ...categoryResult].length) {
      res.json([])
    } else if (productResult.length && categoryResult.length) {
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
    } else if (productResult.length) {
      res.json([...productResult])
    } else {
      res.json([...categoryResult[0].products])
    }
  } catch (err) {
    next(err)
  }
})
