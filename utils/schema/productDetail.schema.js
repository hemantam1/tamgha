const { productSchema } = require("./product.schema")

function productDetailSchema(constant) {
    return {
        include: ['productDetailID', constant.size, constant.color, constant.priceCurrency, 'totalPrice', 'isFlatDiscount', 'priceExcluding', 'product'],
        as: { sizeAr: 'size', colorAr: 'color', priceCurrencyAr: 'priceCurrency' },
        assoc: {
            product: productSchema(constant),
        },
    }
}


module.exports = {
    productDetailSchema
}