const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    images: { type: String, required: true },
    rating: { type: Number},
    reviews: [
      {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      name: { type: String, required: true },
      rating: { type: Number, required: true, default: 0 },
      comment: { type: String, required: true }
      }
    ],
    numReviews: { type: Number, default: 0}
  },
  {
    timestamps: true,
  }
)

const productsModel = mongoose.model('Product', productsSchema)

module.exports = productsModel