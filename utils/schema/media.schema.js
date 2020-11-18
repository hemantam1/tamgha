const { productSchema } = require("./product.schema")

function mediaSchema(constant) {
    return {
        include: ['mediaID', 'url', 'ext', 'format', 'product'],
        assoc: {
            product: productSchema(constant),
        },
    }
}


module.exports = {
    mediaSchema
}