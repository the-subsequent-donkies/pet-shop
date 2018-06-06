'use strict'

const router = require('express').Router()
const { Product, Category } = require('../db/models')
module.exports = router

// GET Routes

router.get('/', async (req, res, next) => {
  try {
    const response = await Product.findAll()
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const response = await Product.findById(req.params.productId)
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.get('/categories/:categoryId', async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.categoryId },
      include: [{ model: Product, as: 'products' }]
    })
    res.json(category.products)
  } catch (err) {
    next(err)
  }
})

// POST Routes /api/products

router.post('/', async (req, res, next) => {
  try {
    const addedProduct = await Product.create(req.body)
    res.status(201).json(addedProduct)
  } catch (err) {
    next(err)
  }
})


// PUT Routes

router.put('/:productId', async (req, res, next) => {

  try {
    const product = await Product.findById(req.params.productId)
    const addedProduct = await product.update(req.body)
    res.status(200).json(addedProduct)
  } catch (err) {
    next(err)
  }
})
