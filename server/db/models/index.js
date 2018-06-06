'use strict'

const User = require('./user')
const LineItem = require('./lineitem')
const Order = require('./order')
const Product = require('./product')
const Review = require('./review')
const Category = require('./category')
const ProductCategory = require('./productcategory')

// REVIEW: more model specs
Order.belongsTo(User)
User.hasMany(Order)

LineItem.belongsTo(Product)
Product.hasMany(LineItem)

Order.hasMany(LineItem)
LineItem.belongsTo(Order)

Product.belongsToMany(Category, { through: ProductCategory })
Category.belongsToMany(Product, { through: ProductCategory })

module.exports = {
  User,
  LineItem,
  Order,
  Product,
  Review,
  Category,
  ProductCategory
}
