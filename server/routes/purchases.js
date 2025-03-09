const router = require(`express`).Router()

const purchasesModel = require(`../models/purchases`)
const guitarsModel = require(`../models/guitars`)
const usersModel = require(`../models/users`)

const jwt = require('jsonwebtoken')
const fs = require('fs')
const verifyUserJWTEmail = require("../middleware/verifyUserJWTEmail")
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

router.get(`/purchases`, (req, res) => {

    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => {
        if (err) {
            res.json({errorMessage: `User is not logged in`})
        } else {
            if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
                purchasesModel.find((error, data) => {
                    res.json(data)
                })
            } else if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_NORMAL_USER) {
                purchasesModel.find({customerEmail: decodedToken.email}, (error, data) => {
                    res.json(data)
                })
            } else {
                res.json({errorMessage: `User is not a customer or Admin, so they cannot access new records`})
            }
        }
    })
})

router.get(`/purchases/:id`, (req, res) => {

    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => {
        if (err) {
            res.json({errorMessage: `User is not logged in`})
        } else {
            if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_NORMAL_USER) {
                purchasesModel.findById(req.params.id, (error, data) => {
                    res.json(data)
                })
            } else {
                res.json({errorMessage: `User is not a customer or Admin, so they access records`})
            }
        }
    })
})

router.post(`/purchases`, (req, res) => {

    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => {
        if (err) {
            res.json({errorMessage: `User is not logged in`})
        } else {
            if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_NORMAL_USER) {
                purchasesModel.create(req.body, (error, data) => {
                    res.json(data)
                })
            } else {
                res.json({errorMessage: `User is not a customer or Admin, so they cannot add new records`})
            }
        }
    })
})

router.put(`/purchases/:id`, (req, res) => {
    purchasesModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => {
        res.json(data)
    })
})

const createNewPurchaseDocument = (req, res, next) => {

    const {paypalPaymentID, totalPayment} = req.body

    const userEmail = req.decodedToken.email

    usersModel.findOne({email: userEmail})
        .then(user => {
            if (!user) {
                return res.status(404).json({errorMessage: "User not found"})
            }

            const purchaseDetails = {
                purchaseDate: new Date().toISOString(),
                customerFirstName: user.firstName,
                customerLastName: user.lastName,
                customerEmail: user.email,
                customerAddress1: user.address1,
                customerAddress2: user.address2,
                customerCounty: user.county,
                customerPhone: user.phone,
                cart: user.cart,
                paypalPaymentID: paypalPaymentID,
                totalPayment: totalPayment,
                returned: false,
                returnDate: "N/A",
            }

            const newPurchase = new purchasesModel(purchaseDetails)
            return newPurchase.save()
        })
        .then(newPurchase => {
            res.status(201).json({success: true, purchase: newPurchase})
        })
        .catch(error => {
            console.error("Error creating purchase:", error)
            res.status(500).json({errorMessage: "Internal server error"})
        })
}

router.post(`/purchases/paypal`, verifyUserJWTEmail, createNewPurchaseDocument)

module.exports = router