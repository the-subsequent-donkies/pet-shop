const router = require('express').Router()
module.exports = router

router.use('/products', require('./products'))
router.use('/categories', require('./categories'))
router.use('/reviews', require('./reviews'))
router.use('/orders', require('./orders'))
router.use('/lineitems', require('./line-items'))
router.use('/search', require('./search-bar'))
router.use('/users', require('./users'))
router.use('/charge', require('./stripe'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
