const mongoose = require('mongoose')

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
        accessLevel: { type: Number, default: parseInt(process.env.ACCESS_LEVEL_NORMAL_USER) },
        image: { type: String },
        cart: {
            type: [
                {
                    guitarId: String,
                    quantity: { type: Number, default: 1 }
                }
            ],
            default: []
        }
    },
    {
        collection: `users`
    }
)

module.exports = mongoose.model(`users`, usersSchema)
