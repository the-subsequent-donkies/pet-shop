'use strict'

const { expect } = require('chai')
const request = require('supertest')
const app = require('../../index')
const { Product, Category, ProductCategory } = require('../../db/models')
const axios = require('axios')

describe('Product routes', () => {
  describe('/api/products', () => {
    const newProduct = {
      name: 'Dog collar',
      inventory: '5',
      price: '16.50',
      description: 'Stylish collar for only the coolest of pups'
    }

    const updatedProduct = {
      name: 'Dog collar',
      inventory: '4',
      price: '12.50',
      description: 'Stylish collar for only the coolest of pups'
    }


    const newCategory = {
      name: 'dogs',
      description: 'Canis lupus familiaris',
      id: '1'
    }

    beforeEach(async () => {
      await Product.create({ ...newProduct })
    })

    it('GET /api/products returns an array of products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal(newProduct.name)
        })
    })

    it('GET /api/products/:productId returns a single product', () => {
      return request(app)
        .get('/api/products/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.be.equal(newProduct.name)
        })
    })

    it('GET /api/products/categories/:categoryId', async () => {
      await Category.create({ ...newCategory })
      await ProductCategory.create({ productId: '1', categoryId: '1' })
      return request(app)
        .get('/api/products/categories/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal(newProduct.name)
        })
    })

    it('POST /api/products', () => {
      return request(app)
        .post('/api/products')
        .send(newProduct)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.be.equal(newProduct.name)
        })
    })

    // TODO: finish put route
    xit('PUT /api/products/:productId', async () => {
      return request(app)
        .put('/api/products/1')
        .send(updatedProduct)
        .expect(204)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.inventory).to.be.equal(updatedProduct.inventory)
        })
    })
  })
})
