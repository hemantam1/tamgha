
function cartSchema(constant) {
    return {
        include: ['cartID', 'quantity', constant.priceCurrency, 'price'],
        as: { priceCurrencyAr: "priceCurrency" },
    }
}


module.exports = {
    cartSchema
}