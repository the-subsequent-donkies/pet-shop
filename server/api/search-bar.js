const router = require('express').Router()
const { Category, Product } = require('../db/models')
const checkAccess = require('./checkAccess')
const Sequelize = require('sequelize')
module.exports = router

// from front end build a query string that looks liek this:
// category='someCategory'
// product = 'someProd'


router.get('/', async (req, res, next) => {
  try {
    const productResult = await Product.search(req.query.search)
    const categoryResult = await Category.search(req.query.search)
    console.log("what is this category result", categoryResult)
    res.json(productResult)

    // Product.findAll({
    //   where: {
    //     name: {
    //       [Sequelize.Op.iLike]: '%' + req.query.search + '%'
    //     },
    //     status: 'inStock',
    //   },
    //   include: [{ model: Category }]
    // }).then((foundProduct) => {
    //   foundProduct.length > 0 ?
    //     res.json(foundProduct) :
    //     next()
    // })
  } catch (err) {
    next(err)
  }
})

// router.get('/', async (req, res, next) => {
//   try {
//     console.log("what is this garbage ", req.query)
//     Category.findAll({
//       where: {
//         name: {
//           [Sequelize.Op.iLike]: '%' + req.query.search + '%'
//         },
//       },
//       include: [{ model: Product }]
//     }).then((foundProduct) => {
//       foundProduct[0].products.length > 0 ?
//         res.json(foundProduct[0].products) :
//         res.send("product not found or out of stock!")
//     })
//   } catch (err) {
//     next(err)
//   }
// })