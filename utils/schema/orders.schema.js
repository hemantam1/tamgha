const { deliveryAddressSchema } = require("./deliveryAddress.schema")
const { productSchema } = require("./product.schema")
const { productDetailSchema } = require("./productDetail.schema")
const { userSchema } = require("./user.schema")

function orderSchema(constant) {
    return {
        include: ['orderID', 'deliveryMethod', 'paymentMethod', 'status', constant.orderCurrency, 'orderPrice', 'orderQuantity', 'product', 'prod_detail', 'delivery_address'],
        as: { orderCurrencyAr: 'orderCurrency' },
        assoc: {
            product: productSchema(constant),
            prod_detail: productDetailSchema(constant),
            delivery_address: deliveryAddressSchema(constant),
        },
    }
}


module.exports = {
    orderSchema
}