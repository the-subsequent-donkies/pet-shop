const router = require('express').Router()
module.exports = router


router.use('/products', require('./products'))
router.use('/categories', require('./categories'))
router.use('/reviews', require('./reviews'))
router.use('/orders', require('./orders'))
router.use('/lineitems', require('./line-items'))
<<<<<<< HEAD
router.use('/search', require('./search-bar'))
=======
router.use('/users', require('./users'))

>>>>>>> ed659ddc9b2c02a53c2ddb6b171793c12678bd92

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
