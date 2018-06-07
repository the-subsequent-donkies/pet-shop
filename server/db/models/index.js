'use strict'

const User = require('./user')
const LineItem = require('./lineitem')
const Order = require('./order')
const Product = require('./product')
const Review = require('./review')
const Category = require('./category')
const ProductCategory = require('./productcategory')

Order.belongsTo(User)
User.hasMany(Order)

LineItem.belongsTo(Product)
Product.hasMany(LineItem)

Order.hasMany(LineItem)
LineItem.belongsTo(Order)

Product.belongsToMany(Category, { through: ProductCategory })
Category.belongsToMany(Product, { through: ProductCategory })

Review.belongsTo(Product)
Product.hasMany(Review)

Review.belongsTo(User)
User.hasMany(Review)

module.exports = {
  User,
  LineItem,
  Order,
  Product,
  Review,
  Category,
  ProductCategory
}
