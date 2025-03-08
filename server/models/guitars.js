const mongoose = require(`mongoose`)

let guitarsSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        model: {type: String, required: true},
        year: {type: Number, required: true},
        price: {type: Number, required: true},
        type: {type: String, required: true},
        stock: {type: Number, required: true},
        image: {type: String, required: true}
    },
    {
        collection: `guitars`
    })

module.exports = mongoose.model(`guitars`, guitarsSchema)
