const router = require(`express`).Router()
const bcrypt = require('bcryptjs')
const usersModel = require(`../models/users`)

const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

router.post('/users/login/:email/:password', (req, res) => {
    usersModel.findOne({ email: req.params.email }, (error, data) => {
        if (data) {
            bcrypt.compare(req.params.password, data.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({email: data.email, accessLevel:data.accessLevel}, JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn:process.env.JWT_EXPIRY})
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

router.post('/users/register/:name/:email/:password', (req, res) => {
    usersModel.findOne({ email: req.params.email }, (uniqueError, uniqueData) => {
        if(uniqueData)
        {
            res.json({errorMessage:`User already exists`})
        }
        else{
            bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) =>
            {
                usersModel.create({name:req.params.name,email:req.params.email,password:hash}, (error, data) =>
                {
                    if (data) {
                        const token = jwt.sign({email: data.email, accessLevel:data.accessLevel}, JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn:process.env.JWT_EXPIRY})
                        res.json({
                            name: data.firstName + " " + data.lastName,
                            accessLevel: data.accessLevel, token:token })
                    }
                    else {
                        console.log("User not found")
                        res.json({ errorMessage: "User not found" })
                    }
                })
            })
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

    router.post(`/users/logout`, (req,res) => {
        res.json({})
    })

module.exports = router