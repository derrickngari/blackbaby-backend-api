const Product = require('../models/productsModel')

exports.addReview = async (req, res) => {
  const { rating, comment } = req.body

  try {
    const { id } = req.params

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" })
    }

    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    const productReviewed = product.reviews.find(
      (r) => r.user && r.user.id.toString() === req.user.UserId
    )

    if (productReviewed) {
      return res.status(400).json({ message: 'Product already reviewed' })
    }

    if (!rating || isNaN(rating)) {
        return res.status(400).json({ message: "Rating must be a valid number" })
      }

    const review = {
      user: req.user.userId,
      name: req.user.name || 'Anonymous',
      rating,
      comment
    }
    console.log(rating)
    console.log(comment)
    console.log(req.user.id)
    console.log(req.user.name)

    product.reviews.push(review)
    product.numReviews = product.reviews.length

    product.rating = Math.round((product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length) * 10) / 10

    await product.save()

    return res.status(201).json({ message: 'Review added' })

  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}


exports.getReview = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
    
        if (!product) {
          return res.status(404).json({ message: 'Product not found' })
        }
    
        res.status(200).json({ reviews: product.reviews })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
}