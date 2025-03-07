const router = require(`express`).Router()

const guitarsModel = require(`../models/guitars`)

const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')


router.get(`/guitars`, (req, res) =>
{
    guitarsModel.find((error, data) =>
    {
        res.json(data)
    })
})

router.get(`/guitars/:id`, (req, res) =>
{
    guitarsModel.findById(req.params.id, (error, data) =>
    {
        res.json(data)
    })
})

router.post(`/guitars`, (req, res) =>
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
                guitarsModel.create(req.body, (error, data) =>
                {
                    res.json(data)
                })
            }
            else
            {
                res.json({errorMessage:`User is not an administrator, so they cannot add new records`})
            }
        }
    })
})

router.put(`/guitars/:id`, (req, res) =>
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
                guitarsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) =>
                {
                    res.json(data)
                })
            }
            else
            {
                res.json({errorMessage:`User is not an administrator, so they cannot update records`})
            }
        }
    })

})

router.delete(`/guitars/:id`, (req, res) =>
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
                guitarsModel.findByIdAndRemove(req.params.id, (error, data) =>
                {
                    res.json(data)
                })
            }
            else
            {
                res.json({errorMessage:`User is not an administrator, so they cannot delete records`})
            }
        }
    })

})

module.exports = router