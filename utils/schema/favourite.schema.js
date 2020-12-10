const { productSchema } = require("./product.schema")
const { userSchema } = require("./user.schema")

function favouriteSchema(constant) {
    return {
        include: ['favouriteID', 'product', 'user'],
        assoc: {
            user: userSchema(constant),
            product: productSchema(constant)
        }
    }
}


module.exports = {
    favouriteSchema
}