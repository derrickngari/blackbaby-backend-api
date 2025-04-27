const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/UserModel')

exports.register = async (req, res) => {
    console.log("register controller hit")
    
    try {
        const { name, email, password } = req.body

        const checkUser = await User.findOne({ email })
        if (checkUser) return res.status(400).json({ message: 'User alredy exists'})

        // const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ name, email, password: hashedPassword})
        await newUser.save()
        res.status(201).json({ message: 'User Registered Successfully'})
    } catch (error) {
       res.status(500).json({ message: 'Server error: ', error: error.message }) 
    }
}
exports.login = async (req, res) => {
    console.log("login controller hit")
    try{
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if(!user) return res.status(400).json({ message: 'Invalid email or password' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' })

        const token = jwt.sign({
            userId: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        )
        res.status(200).json({ token, user: {
            userId: user._id, 
            name: user.name, 
            email: user.email, 
            role: user.role
        }})

    } catch (err) {
        res.status(500).json({ message: 'Server error: ', error: err.message })
    }
}


