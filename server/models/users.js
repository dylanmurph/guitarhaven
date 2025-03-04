const mongoose = require(`mongoose`)

let usersSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        address1: { type: String, required: true },
        address2: { type: String, required: true },
        county: { type: String, required: true },
        phone: { type: Number, required: true },
        type: { type: String, }
    },
    {
        collection: `users`
    })

module.exports = mongoose.model(`users`, usersSchema)
