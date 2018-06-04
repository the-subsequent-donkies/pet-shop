'use strict'

const db = require('../server/db/db')
const { User, LineItem, Order, Product, Review, Category } = require('../server/db/models')
const productData = require('./data/product.json')

const seed = async () => {
  await db.sync({ force: true })
  await Promise.all(productData.map(pData => Product.create({...pData})))

  console.log(`

    Seeding of Products table successful!`)

  db.close()
}

seed().catch(error => {
  db.close()
  console.log(`

  Something unintended occurred:

  ${error.message}

  ${error.stack}

`)
})
