const router = require(`express`).Router()
const bcrypt = require('bcryptjs')
const usersModel = require(`../models/users`)

const jwt = require('jsonwebtoken')
const fs = require('fs')
const verifyUserJWTEmail = require("../middleware/verifyUserJWTEmail")
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

router.post('/users/login/:email/:password', (req, res) => {
    usersModel.findOne({email: req.params.email}, (error, data) => {
        if (data) {
            bcrypt.compare(req.params.password, data.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({
                        email: data.email,
                        accessLevel: data.accessLevel
                    }, JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY})
                    console.log("User logged in")

                    res.json({
                        name: data.firstName + " " + data.lastName,
                        accessLevel: data.accessLevel, token: token
                    })

                } else {
                    console.log("Invalid login credentials")
                    res.json({errorMessage: "Invalid login credentials"})
                }
            })
        } else {
            console.log("User not found")
            res.json({errorMessage: "User not found"})
        }
    })
})

router.post('/users/register', (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        address1,
        address2,
        county,
        phone,
        accessLevel,
        image
    } = req.body

    usersModel.findOne({email: email}, (uniqueError, uniqueData) => {
        if (uniqueData) {
            res.json({errorMessage: "User already exists"})
        }

        bcrypt.hash(password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) => {
            usersModel.create({
                firstName,
                lastName,
                email,
                password: hash,
                address1,
                address2,
                county,
                phone,
                accessLevel,
                image,
                cart: []
            }, (error, data) => {
                if (data) {
                    res.json({name: firstName, accessLevel: accessLevel})
                }
            })
        })
    })
})

router.get('/users', verifyUserJWTEmail, (req, res) => {
    const email = req.decodedToken.email

    usersModel.findOne({email})
        .then(user => {
            if (!user) {
                return res.status(404).json({errorMessage: "User not found"})
            }

            console.log(user)

            res.json({
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                address1: user.address1,
                address2: user.address2,
                county: user.county,
                phone: user.phone,
                image: user.image,
            })
        })
        .catch(err => {
            console.log("Error fetching user:", err)
            res.status(500).json({errorMessage: "Error retrieving user data"})
        })
})

router.get(`/users/all`, (req, res) => {
    usersModel.find((error, data) => {
        res.json(data)
    })
})

router.get(`/users/:id`, (req, res) => {
    usersModel.findById(req.params.id, (error, data) => {
        res.json(data)
    })
})


router.post(`/users`, (req, res) => {
    usersModel.create(req.body, (error, data) => {
        res.json(data)
    })
})

router.put(`/users/:id`, (req, res) => {
    usersModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => {
        res.json(data)
    })
})

router.delete(`/users/:id`, (req, res) => {
    usersModel.findByIdAndRemove(req.params.id, (error, data) => {
        res.json(data)
    })
})

router.post(`/users/logout`, (req, res) => {
    req.session.destroy()
    res.json({})
})

module.exports = router