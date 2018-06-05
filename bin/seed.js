'use strict'

const db = require('../server/db/db')
const { User, LineItem, Order, Product, Review, Category, ProductCategory } = require('../server/db/models')
const { productData, categoryData, productCategoryData, reviewData, userData } = require('./data')

const seed = async () => {

  await db.sync({ force: true })

  await Promise.all(productData.map(pData => Product.create({...pData})))
  console.log(`
    Seeding of Products table successful!`)

  await Promise.all(categoryData.map(cData => Category.create({...cData})))
  console.log(`
    Seeding of Categories table successful!`)

  await Promise.all(productCategoryData.map(pcData => ProductCategory.create({...pcData})))
  console.log(`
    Seeding of Product-Category associations successful!`)

  await Promise.all(reviewData.map(rData => Review.create({...rData})))
  console.log(`
    Seeding of Reviews table successful!`)

  await Promise.all(userData.map(uData => User.create({...uData})))
  console.log(`
    Seeding of Users table successful!
  `)

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
