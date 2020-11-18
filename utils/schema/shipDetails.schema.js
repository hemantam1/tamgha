
function shipDetailSchema(constant) {
    return {
        include: ['shipID', 'weight', constant.priceCurrency, 'price'],
        as: { priceCurrencyAr: 'priceCurrency' },
    }
}


module.exports = {
    shipDetailSchema
}