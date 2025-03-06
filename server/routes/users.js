const router = require(`express`).Router()
const bcrypt = require('bcryptjs')
const usersModel = require(`../models/users`)

const jwt = require('jsonwebtoken')

router.post('/users/login/:email/:password', (req, res) => {
    usersModel.findOne({ email: req.params.email }, (error, data) => {
        if (data) {
            bcrypt.compare(req.params.password, data.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({email:data.email, accessLevel:data.accessLevel}, process.env.JWT_PRIVATE_KEY, {algorithm:'HS256', expiresIn:process.env.JWT_EXPIRY})
                    console.log("User logged in")

                    res.json({
                        name: data.firstName + " " + data.lastName,
                        accessLevel: data.accessLevel, token:token })
                } else {
                    console.log("Invalid login credentials")
                    res.json({ errorMessage: "Invalid login credentials" })
                }
            })
        } else {
            console.log("User not found")
            res.json({ errorMessage: "User not found" })
        }
    })
})

router.get(`/users`, (req, res) =>
{
    usersModel.find((error, data) =>
    {
        res.json(data)
    })
})

router.get(`/users/:id`, (req, res) =>
{
    usersModel.findById(req.params.id, (error, data) =>
    {
        res.json(data)
    })
})

router.post(`/users`, (req, res) =>
{
    usersModel.create(req.body, (error, data) =>
    {
        res.json(data)
    })
})

router.put(`/users/:id`, (req, res) =>
{
    usersModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) =>
    {
        res.json(data)
    })
})

router.delete(`/users/:id`, (req, res) =>
{
    usersModel.findByIdAndRemove(req.params.id, (error, data) =>
    {
        res.json(data)
    })
})

module.exports = router