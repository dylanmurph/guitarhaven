const mongoose = require(`mongoose`)

let purchasesSchema = new mongoose.Schema(
    {
        purchaseDate: {type: String, required: true},
        customerFirstName: {type: String, required: true},
        customerLastName: {type: String, required: true},
        customerEmail: {type: String, required: true},
        customerAddress1: {type: String, required: true},
        customerAddress2: {type: String, required: true},
        customerCounty: {type: String, required: true},
        customerPhone: {type: Number, required: true},
        returned: {type: Boolean},
        returnDate: {type: String},
        cart: {
            type: [
                {
                    guitarId: String,
                    quantity: {type: Number, default: 1}
                }
            ],
            default: []
        },
        paypalPaymentID: {type: String, required: true},
        totalPayment: {type: Number, required: true}
    },
    {
        collection: `purchases`
    })

module.exports = mongoose.model(`purchases`, purchasesSchema)