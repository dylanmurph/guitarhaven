const router = require(`express`).Router()
const bcrypt = require('bcryptjs')
const usersModel = require(`../models/users`)

router.post('/users/login/:email/:password', (req, res) => {
    usersModel.findOne({ email: req.params.email }, (error, data) => {
        if (data) {
            bcrypt.compare(req.params.password, data.password, (err, result) => {
                if (result) {
                    req.session.user = { email: data.email, accessLevel: data.accessLevel }
                    console.log("User logged in")
                    res.json({
                        name: data.firstName + " " + data.lastName,
                        accessLevel: data.accessLevel })
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