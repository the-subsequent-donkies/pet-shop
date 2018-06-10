'use strict'

const { expect, assert } = require('chai')
const request = require('supertest')
const app = require('../../index')
const { Product, Review, User } = require('../../db/models')

describe('Review API routes', () => {
  const newReview = {
    content: "this is a new review",
    stars: 4,
    id: 1
  }

  const newUser = {
    name: "cody",
    email: "cody@cody.com",
    isAdmin: false,
    address: "123 Street",
    id: 1
  }

  const newProduct = {
    name: "test product",
    inventory: 1,
    price: 10,
    description: "test description",
    id: 1
  }

  describe('Public', () => {

    beforeEach(async () => {
      let newProd = await Product.create(newProduct)
      let newUse = await User.create(newUser)
      let newRev = await Review.create(newReview)
      await newRev.setUser(newUse)
      await newRev.setProduct(newProd)
    })

    it('GET /api/reviews returns an array of reviews', () => {
      return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].content).to.be.equal(newReview.content)
        })
    })

    it('GET /api/reviews/:productId returns an array of reviews filtered by productId', () => {
      return request(app)
        .get('/api/reviews/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].content).to.be.equal(newReview.content)
        })
    })

    it('GET /api/reviews/editreview/:reviewId returns a single review', () => {
      return request(app)
        .get('/api/reviews/editreview/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.content).to.be.equal(newReview.content)
        })
    })
  })


})
