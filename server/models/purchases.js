const mongoose = require(`mongoose`)

let purchasesSchema = new mongoose.Schema(
    {
        productName: {type: String, required: true},
        productModel: {type: String, required: true},
        productPrice: {type: Number, required: true},
        purchaseDate: { type: String, required: true },
        customerFirstName: { type: String, required: true },
        customerLastName: { type: String, required: true },
        customerEmail: { type: String, required: true },
        customerAddress1: { type: String, required: true },
        customerAddress2: { type: String, required: true },
        customerCounty: { type: String, required: true },
        customerPhone: { type: Number, required: true },
        returned: { type: Boolean},
        returnDate: { type:String}
    },
    {
        collection: `purchases`
    })

module.exports = mongoose.model(`purchases`, purchasesSchema)