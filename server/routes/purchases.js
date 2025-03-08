const router = require(`express`).Router()

const purchasesModel = require(`../models/purchases`)

const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

router.get(`/purchases`, (req, res) =>
{

    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) =>
    {
        if (err)
        {
            res.json({errorMessage:`User is not logged in`})
        }
        else
        {
            if(decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
            {
                purchasesModel.find((error, data) =>
                {
                    res.json(data)
                })
            }else if(decodedToken.accessLevel >= process.env.ACCESS_LEVEL_NORMAL_USER){
                purchasesModel.find({ customerEmail: decodedToken.email },(error, data) =>
                {
                    res.json(data)
                })
            }
            else
            {
                res.json({errorMessage:`User is not a customer or Admin, so they cannot access new records`})
            }
        }
    })
})

router.get(`/purchases/:id`, (req, res) =>
{

    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) =>
    {
        if (err)
        {
            res.json({errorMessage:`User is not logged in`})
        }
        else
        {
            if(decodedToken.accessLevel >= process.env.ACCESS_LEVEL_NORMAL_USER)
            {
                purchasesModel.findById(req.params.id, (error, data) =>
                {
                    res.json(data)
                })
            }
            else
            {
                res.json({errorMessage:`User is not a customer or Admin, so they access records`})
            }
        }
    })
})

router.post(`/purchases`, (req, res) =>
{

    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) =>
    {
        if (err)
        {
            res.json({errorMessage:`User is not logged in`})
        }
        else
        {
            if(decodedToken.accessLevel >= process.env.ACCESS_LEVEL_NORMAL_USER)
            {
                purchasesModel.create(req.body, (error, data) =>
                {
                    res.json(data)
                })
            }
            else
            {
                res.json({errorMessage:`User is not a customer or Admin, so they cannot add new records`})
            }
        }
    })
})





module.exports = router