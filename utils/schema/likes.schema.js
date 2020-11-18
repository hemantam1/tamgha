const { productSchema } = require("./product.schema")
const { userSchema } = require("./user.schema")

function likesSchema(constant) {
    return {
        include: ['likeID', 'product'],
        assoc: {
            product: productSchema(constant),

        },
    }
}


module.exports = {
    likesSchema
}