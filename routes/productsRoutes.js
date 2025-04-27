const express = require('express')
const router = express.Router()
const { protect, adminOnly } = require('../middlewares/authMiddlleware')
const { createProduct, getAllProducts,getProductById, updateProduct, deleteProduct, uploads } = require('../controllers/productsController')
const upload = require('../middlewares/upload')
const { addReview, getReview } = require('../controllers/reviewController')

router.post('/products', protect, adminOnly, createProduct)
router.get('/products', getAllProducts)
router.get('/products/:id', getProductById)
router.put('/products/:id', protect, adminOnly, updateProduct)
router.delete('/products/:id', protect, adminOnly, deleteProduct)
router.post('/products/upload/:id', protect, adminOnly, upload.single('image'), uploads)
// router.get('/', getAllProducts)
router.post('/products/:id/review', protect, addReview)
router.get('/products/:id/review', getReview)

module.exports = router