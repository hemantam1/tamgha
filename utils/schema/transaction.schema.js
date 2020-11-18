const { orderSchema } = require("./orders.schema")
const { userSchema } = require("./user.schema")

function transactionSchema(constant) {
    return {
        include: ['transactionID', constant.transactionDetails, constant.currency, 'salesPrice', 'paymentGateway', 'status', 'isSuccesfull', 'isRefunded', 'collectedAmmount', 'finalAmmount', 'user', 'order'],
        as: { transactionDetailsAr: 'transactionDetails', currencyAr: 'currency' },
        assoc: {
            order: orderSchema(constant),
        }

    }
}


module.exports = {
    transactionSchema
}