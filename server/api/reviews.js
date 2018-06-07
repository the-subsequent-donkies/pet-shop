'use strict'

const router = require('express').Router()
const { Product, Category, Review } = require('../db/models')
module.exports = router

// GET Routes

router.get('/', async (req, res, next) => {
  try {
    const response = await Review.findAll()
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.get('/:reviewId', async (req, res, next) => {
  try {
    const response = await Review.findAll({
      where: {
        productId: req.params.reviewId
      }
    })
    res.json(response)
  } catch (err) {
    next(err)
  }
})

// POST Routes /api/products

router.post('/', async (req, res, next) => {
  try {
    const addedReview = await Review.create(req.body)
    res.status(201).json(addedReview)
  } catch (err) {
    next(err)
  }
})


// PUT Routes

router.put('/:reviewId', async (req, res, next) => {

  try {
    const review = await Review.findById(req.params.reviewId)
    const addedReview = await review.update(req.body)
    res.status(200).json(addedReview)
  } catch (err) {
    next(err)
  }
})
