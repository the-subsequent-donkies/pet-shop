
module.exports = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).send('Unauthorized to access API')
  }
}
