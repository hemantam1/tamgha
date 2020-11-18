const { productSchema } = require("./product.schema")

function measureTypeSchema(constant) {
    return {
        include: ['typeID', constant.type, 'product'],
        as: { typeAr: 'type' },
        assoc: {
            product: productSchema(constant),
        },
    }
}


module.exports = {
    measureTypeSchema
}