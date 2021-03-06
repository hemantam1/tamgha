const { productSchema } = require("./product.schema")
const { userSchema } = require("./user.schema")

function cartSchema(constant) {
    return {
        include: ['cartID', 'quantity', constant.priceCurrency, 'price', 'product'],
        as: { priceCurrencyAr: "priceCurrency" },
        assoc: {
            product: productSchema(constant)
        }
    }
}


module.exports = {
    cartSchema
}