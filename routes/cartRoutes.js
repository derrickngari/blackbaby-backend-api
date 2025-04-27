const express = require('express')
const router = express.Router()
const { getCartItems } = require('../controllers/cartController')

router.get('/cart', getCartItems)

module.exports = router