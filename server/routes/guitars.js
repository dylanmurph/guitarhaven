const router = require(`express`).Router()

const guitarsModel = require(`../models/guitars`)

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
    guitarsModel.create(req.body, (error, data) =>
    {
        res.json(data)
    })
})

router.put(`/guitars/:id`, (req, res) =>
{
    guitarsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) =>
    {
        res.json(data)
    })
})

router.delete(`/guitars/:id`, (req, res) =>
{
    guitarsModel.findByIdAndRemove(req.params.id, (error, data) =>
    {
        res.json(data)
    })
})

module.exports = router