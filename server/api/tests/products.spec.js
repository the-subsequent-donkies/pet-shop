'use strict'

const { expect, assert } = require('chai')
const request = require('supertest')
const app = require('../../index')
const { Product, Category, ProductCategory, User } = require('../../db/models')

describe('Product API routes', () => {
  const newProduct = {
    name: 'Dog collar',
    inventory: '5',
    price: '16.50',
    description: 'Stylish collar for only the coolest of pups',
    id: '1'
  }

  const newCategory = {
    name: 'dogs',
    description: 'Canis lupus familiaris',
    id: '1'
  }

  describe('Public', () => {

    beforeEach(() => Product.create({ ...newProduct }))

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

    it('GET /api/products/categories/:categoryId returns an array of products by category', async () => {
      await Category.create({ ...newCategory })
      await ProductCategory.create({ productId: '1', categoryId: '1' })
      return request(app)
        .get('/api/products/categories/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('string')
          expect(res.body[0].name).to.be.equal(newProduct.name)
        })
    })

  })

  describe('Admin', () => {

    const adminUser = {
      name: 'Admin',
      email: 'superrealemail@gmail.com',
      isAdmin: true,
      address: '123 Fake Street',
      password: '1234'
    }
    const authenticatedUser = request.agent(app)

    const updatedProduct = {
      name: 'Dog collar',
      inventory: '4',
      price: '12.50',
      description: 'Stylish collar for only the coolest of pups'
    }

    beforeEach(() => User.create({ ...adminUser }))

    beforeEach(done => {
      authenticatedUser
        .post('/auth/login')
        .send(adminUser)
        .end((err, res) => {
          if (err) throw err
          assert(res.statusCode === 200, 'Login failed for admin tests')
          done()
        })
    })

    it('POST /api/products allows an admin to add a new product', () => {
      return authenticatedUser
        .post('/api/products')
        .send(newProduct)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.be.equal(newProduct.name)
        })
    })

    it('PUT /api/products/:productId allows an admin to edit an existing product', () => {
      return authenticatedUser
        .post('/api/products')
        .send(newProduct)
        .then(() => {
          return authenticatedUser
          .put('/api/products/1')
          .send(updatedProduct)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object')
            expect(res.body.inventory).to.be.equal(updatedProduct.inventory)
          })
        })
    })
  })
})
