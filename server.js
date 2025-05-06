const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
// const {dbConnection} = './config/dbConnect.js'
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productsRoutes')
const cartRoutes = require('./routes/cartRoutes')

const PORT = process.env.PORT
const MONGOOSE_URI = process.env.MONGOOSE_URI

app.use(cors())
app.use(express.json())

mongoose.connect(MONGOOSE_URI).then(() => console.log('Database connected...')).catch((err) => console.log(`Failed to connect: ${err.message}`))

app.get('/', (req, res) => {
    res.send('Hello Dee!!')
})


app.use('/api/auth', authRoutes)
app.use('/api', userRoutes, productRoutes, cartRoutes)

app.listen(PORT, (req, res) => {
    console.log(`Server running on port ${PORT}`)
})