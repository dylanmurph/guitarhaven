const router = require('express').Router()
const usersModel = require('../models/users')
const verifyUserJWTEmail = require('../middleware/verifyUserJWTEmail')

router.get('/cart', verifyUserJWTEmail, (req, res) => {
    const userEmail = req.decodedToken.email

    usersModel.findOne({ email: userEmail })
        .then(user => {
            if (!user) {
                return res.status(404).json(
                    {
                    errorMessage: "User not found"
                    })
            } else {
                res.json(user.cart)
            }
        })
        .catch(() => {
            res.status(500).json(
                { errorMessage: "Error retrieving cart"
                })
        })
})

router.post('/cart/add', verifyUserJWTEmail, (req, res) => {
    const userEmail = req.decodedToken.email
    const { guitarId } = req.body

    usersModel.findOne({ email: userEmail })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                        errorMessage: "User not found"
                    })
            } else {
                let item = user.cart.find(item => item.guitarId === guitarId)

                if (item) {
                    item.quantity++
                } else {
                    user.cart.push({ guitarId, quantity: 1 })
                }

                return user.save()
            }
        })
        .then(user => {
            res.json(user.cart)
        })
        .catch(() => {
            res.status(500).json({
                errorMessage: "Error updating cart"
            })
        })
})

router.put('/cart/update', verifyUserJWTEmail, (req, res) => {
    const { guitarId, quantity } = req.body
    const userEmail = req.decodedToken.email

    usersModel.findOne({ email: userEmail })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    errorMessage: "User not found"
                })
            } else {
                let item = user.cart.find(item => item.guitarId === guitarId)

                if (item) {
                    item.quantity = quantity
                }

                return user.save()
            }
        })
        .then(user => {
            res.json(user.cart)
        })
        .catch(() => {
            res.status(500).json({
                errorMessage: "Error updating cart"
            })
        })
})

router.delete('/cart/remove/:guitarId', verifyUserJWTEmail, (req, res) => {
    const userEmail = req.decodedToken.email
    const { guitarId } = req.params

    usersModel.findOne({ email: userEmail })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    errorMessage: "User not found"
                })
            } else {
                user.cart = user.cart.filter(item => item.guitarId !== guitarId)
                return user.save()
            }
        })
        .then(user => {
            res.json(user.cart)
        })
        .catch(() => {
            res.status(500).json({
                errorMessage: "Error removing item from cart"
            })
        })
})

module.exports = router
