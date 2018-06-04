const User = require('./user')
const LineItem = require('./lineitem')
const Order = require('./order')
const Product = require('./product')
const Review = require('./review')
const Category = require('./category')

Order.belongsTo(User)
User.hasMany(Order)
LineItem.hasOne(Product)
Product.belongsToMany(LineItem)
Order.hasMany(LineItem)
LineItem.belongsTo(Order)
Product.belongsToMany(Category)
Category.hasMany(Product)

module.exports = {
  User,
  LineItem,
  Order,
  Product,
  Review,
  Category
}
