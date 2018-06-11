
const { expect } = require('chai')
const request = require('supertest')
const app = require('../../index')
// const db = require('../../db')
const { Order, LineItem, Product, User } = require('../../db/models')
const axios = require('axios')

// console.log(Order.create({
//   status: "Initialized",
//   submittedAt: "2018-04-01 08:22:52.7-05"
// }))

describe('Line-Item Routes', () => {
  describe('api/line-items', () => {
    // create seed data here

    const orderOne = {
      status: 'Initialized',
      submittedAt: "2018-04-01 08:22:52.7-05"
    }
    const orderTwo = {
      status: 'Processing',
      submittedAt: "2018-03-01 08:22:52.7-05"
    }
    const orderThree = {
      status: 'Completed',
      submittedAt: "2018-03-01 08:29:52.7-05"
    }
    const orderFour = {
      status: 'Processing',
      submittedAt: "2017-03-01 08:22:52.7-05"
    }
    const lineItemOne = {
      productId: '1',
      currentPrice: '2.00',
      quantity: '1',
      orderId: '1'
    }
    const lineItemTwo = {
      productId: '2',
      currentPrice: '4.00',
      quantity: '2',
      orderId: '2'
    }
    const lineItemThree = {
      productId: '3',
      currentPrice: '4.00',
      quantity: '2',
      orderId: '3'
    }
    const productOne = {
      id: '1',
      name: 'Bone',
      inventory: '4',
      price: '2.50',
      imgUrl: 'https://i.imgur.com/zzD13aO.jpg',
      description: 'This is a fun chew toy for dogs',
      category: 'dogs'
    }
    const productTwo = {
      id: '2',
      name: 'Bone',
      inventory: '4',
      price: '2.50',
      imgUrl: 'https://i.imgur.com/zzD13aO.jpg',
      description: 'This is a fun chew toy for dogs',
      category: 'dogs'
    }
    const productThree = {
      id: '3',
      name: 'Rope',
      inventory: '6',
      price: '3.50',
      imgUrl: 'https://i.imgur.com/zzD13aO.jpg',
      description: 'This is a fun chew toy for dogs',
      category: 'dogs'
    }
    const categoryOne = {
      name: "dogs",
      description: "Canis lupus familiaris"
    }
    const productCategoryOne = {
      productId: "1",
      categoryId: "2"
    }
    const userOne = {
      name: "lamine",
      email: "lams101@gmail.com",
      isAdmin: false,
      password: "password",
      address: "111 south one ave",
      credentials: "placeHolderCreds"
    }
    const userTwo = {
      name: "enimal",
      email: "101smal@gmail.com",
      isAdmin: false,
      password: "password",
      address: "111 htuos eno eva",
      credentials: "sdreCredloHecalp"
    }

    beforeEach(async () => {
      await Product.create(productOne)
      await Product.create(productTwo)
      const orderWon = await Order.create(orderOne)
      const orderToo = await Order.create(orderTwo)
      const lineItemWon = await LineItem.create(lineItemOne)
      const lineItemToo = await LineItem.create(lineItemTwo)
      await orderWon.addLine_item(lineItemWon)
      await orderToo.addLine_item(lineItemToo)
      const userWon = await User.create(userOne)
      const userToo = await User.create(userTwo)
      orderWon.setUser(userWon)
      orderToo.setUser(userToo)
    })


    it('GET /api/lineitems returns an array of orders', () => {
      return request(app)
        .get('/api/lineitems')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
        })
    })

    xit('GET /api/lineitems/:orderId returns a line items belonging to the correct order ', async () => {
      await Product.create(productThree)
      const orderTres = await Order.create(orderThree)
      const lineItemTres = await LineItem.create(lineItemThree)
      await orderTres.addLine_item(lineItemTres)
      const userTres = await User.create(user)
      return request(app)
        .get('/api/lineitems/1')
        .expect(200)
        .then(res => {
          expect(res.body[0]).to.be.an('object')
          expect(res.body[0].orderId).to.be(orderWon.id)
        })
    })

    xit("GET /api/orders/:orderId eagerly loads the line items", () => {
      return request(app)
        .get('/api/orders/2')
        .expect(200)
        .then(res => {
          expect(res.body[0].line_items).to.be.an('array')
        })
    })

    xit("GET /api/orders/me/1 gets a users orders and eagerly loads line items and products", () => {
      return request(app)
        .get('/api/orders/me/1')
        .expect(200)
        .then(res => {
          console.log("what is res.body here", res.body)
          expect(res.body).to.be.an('object')
          expect(res.body.line_items).to.be.an('array')
          expect(res.body.line_items[0].product).to.be.an('object')
        })
    })

    xit('POST /api/orders', () => {
      return request(app)
        .post('/api/orders')
        .send(orderThree)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.be.equal(orderThree.status)
        })
    })

    xit('PUT /api/orders/:orderId', async () => {
      await Order.create(orderThree)
      return request(app)
        .put('/api/orders/3')
        .send({
          ...orderThree,
          status: 'Initialized'
        })
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.be.equal('Initialized')
        })
    })

  })
})