'use strict'

const router = require('express').Router()
const { Product, Category } = require('../db/models')
const checkAccess = require('./checkAccess')
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
    const response = await Product.findOne({
      where: { id: req.params.productId },
      include: [{ model: Category, attributes: ['id'] }]
    })
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

router.post('/', checkAccess, async (req, res, next) => {
  const { name, inventory, price, imgUrl, description, categories } = req.body
  try {
    const addedProduct = await Product.create({ name, inventory, price, imgUrl, description })
    const categoryArray =
      await Promise.all(categories
        .map(categoryId => Category.findById(categoryId)))
    categoryArray.forEach(category => addedProduct.addCategory(category))
    res.status(201).json(addedProduct)
  } catch (err) {
    next(err)
  }
})


// PUT Routes
router.put('/:productId', checkAccess, async (req, res, next) => {
  const { name, inventory, price, imgUrl, description, categories } = req.body
  try {
    const product = await Product.findById(req.params.productId)
    const updatedProduct = await product.update({ name, inventory, price, imgUrl, description })
    if (categories && categories.length > 0) {
      categories.forEach(async category => {
        const returnedCategory = await Category.findOne({ where: { id: category.id }})
          .then(() => product.addCategory(returnedCategory))
      })
    }
    res.status(200).json(updatedProduct)
  } catch (err) {
    next(err)
  }
})
