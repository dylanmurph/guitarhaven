const router = require(`express`).Router()

const guitarsModel = require(`../models/guitars`)

// read all records
router.get(`/guitars`, (req, res) =>
{
    guitarsModel.find((error, data) =>
    {
        res.json(data)
    })
})


// Read one record
router.get(`/guitars/:id`, (req, res) =>
{
    guitarsModel.findById(req.params.id, (error, data) =>
    {
        res.json(data)
    })
})


// Add new record
router.post(`/guitars`, (req, res) =>
{
    guitarsModel.create(req.body, (error, data) =>
    {
        res.json(data)
    })
})


// Update one record
router.put(`/guitars/:id`, (req, res) =>
{
    guitarsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) =>
    {
        res.json(data)
    })
})


// Delete one record
router.delete(`/guitars/:id`, (req, res) =>
{
    guitarsModel.findByIdAndRemove(req.params.id, (error, data) =>
    {
        res.json(data)
    })
})

module.exports = router