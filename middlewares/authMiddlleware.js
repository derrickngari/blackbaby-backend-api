const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

exports.protect = async (req, res, next) => {
    let token = req.headers.authorization
    console.log(token)

    if (!token || !token.startsWith('Bearer')) return res.status(401).json('No token found')

    try {
        token = token.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.userId).select('-password')

        if (!user) return res.status(401).json({ message: 'User noy found'})
        req.user = user
        next()
    } catch (error) {
        res.status(401).json('Invalid token')
    }
}

exports.adminOnly = async (req, res, next) => {
    if (req.user.role == 'admin') {
        next()
    } else {
        res.status(403).json('Unautharised! Admins only')
    }
}