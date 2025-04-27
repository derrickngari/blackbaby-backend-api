const express = require('express')
const { protect, adminOnly } = require('../middlewares/authMiddlleware')
const User = require('../models/UserModel')
const router = express.Router()

router.get('/users', protect, adminOnly,  async (req, res) => {
    console.log(req.user.role)
    const users = await User.find().select('-password')
    res.status(200).json(users)
})

router.put('/users/:id', protect, adminOnly, async (req, res) => {
    const { id } = req.params
    const { role } = req.body

    const user = await User.findById(id)
    if (!user) return res.status(404).json('USer not found')

    user.role = role
    await user.save()
    res.status(201).json({ message: 'User updated', user })
})

router.delete('/users/:id', protect, adminOnly, async (req, res) => {
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)
    res.status(201).json({ message: 'USer deleted' })
})

router.post('/make-admin', protect, async (req, res) => {
    try {
        console.log('req.user:', req.user)
        const user = await User.findById(req.user._id)
        if (!user) return res.status(404).json({ message: 'User not found' })
    
        user.role = 'admin';
        await user.save();
    
        res.json({ message: 'You are now an admin!' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
  })

module.exports = router