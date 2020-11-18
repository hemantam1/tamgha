const { productSchema } = require("./product.schema")
const { userSchema } = require("./user.schema")

function favouriteSchema(constant) {
    return {
        include: ['favouriteID', 'product'],
        assoc: {
            product: productSchema(constant)
        }
    }
}


module.exports = {
    favouriteSchema
}