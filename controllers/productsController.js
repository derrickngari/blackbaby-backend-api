const Product = require('../models/productsModel')

exports.createProduct = async (req, res) => {
    // const { name, category, brand, description, price, stock, images, rating, reviews } = req.body

    try {
        const product = await new Product(req.body)
        await product.save()
        res.status(201).json('product added successfuly', { product })
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

exports.getAllProducts = async(req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            category,
            brand,
            minPrice,
            maxPrice,
            sort
          } = req.query

          const query = {
            name: { $regex: search, $options: 'i' }
          }

          if (category) query.category = category
    if (brand) query.brand = brand;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }

    let sortBy = {};
    if (sort === 'price_asc') sortBy.price = 1;
    else if (sort === 'price_desc') sortBy.price = -1;
    else if (sort === 'rating_desc') sortBy.rating = -1;
    else sortBy.createdAt = -1;

    const products = await Product.find(query)
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit)
    })
    } catch (error) {
        res.status(401).json({ message: error.message})
    }
}

exports.updateProduct = async (req, res)=> {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true
        })
        if (!product) return res.status(401).json({ message: 'Product not found'})
        res.status(201).json({ message: 'Product updated', product })
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        if (!product) return res.status(401).json({ message: 'Product not found'})
        res.status(201).json(product)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) return res.status(401).json({ message: 'Product not found'})
        res.status(201).json({ message: 'Product deleted' })
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

exports.uploads = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        if (!product) return res.status(401).json({ message: 'Product not found' })

        product.images = req.file.path
        await product.save()

        res.status(200).json({ message: 'Image uploaded successfully', imageUrl: req.file.path})
    } catch (err){
        res.status(401).json({ message: err.message })
    }
}