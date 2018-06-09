'use strict'

const router = require('express').Router()
const { Product, Category, Review, User } = require('../db/models')
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

router.get('/:productId', async (req, res, next) => {
  try {
    const response = await Review.findAll({
      where: {
        productId: req.params.productId
      },
      include: [User]
    })
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.get('/editreview/:reviewId', async (req, res, next) => {
  try {
    const response = await Review.findById(req.params.reviewId)
    res.json(response)
  } catch (err) {
    next(err)
  }
})

// POST Routes

router.post('/', async (req, res, next) => {
  console.log("post route:", req.body)
  try {
    const review = { content: req.body.content, stars: req.body.stars }
    const addedReview = await Review.create(review)
    addedReview.setProduct(req.body.product.id)
    addedReview.setUser(req.body.user.id)
    res.status(201).json(addedReview)
  } catch (err) {
    next(err)
  }
})


// PUT Routes

router.put('/editreview/:reviewId', async (req, res, next) => {
  console.log('put route: ', req.body)
  try {
    const review = await Review.findById(req.params.reviewId)
    const addedReview = await review.update(req.body)
    res.status(200).json(addedReview)
  } catch (err) {
    next(err)
  }
})
