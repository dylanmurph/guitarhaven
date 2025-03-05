const router = require(`express`).Router()

const usersModel = require(`../models/users`)

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