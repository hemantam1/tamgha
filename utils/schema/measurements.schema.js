const { productDetailSchema } = require("./productDetail.schema")

function measurementsSchema(constant) {
    return {
        include: ['measurementID', constant.measurementType, 'measurementValue', 'prod_details'],
        as: { measurementTypeAr: 'measurementType' },
        assoc: {
            prod_details: productDetailSchema(constant),

        },
    }
}


module.exports = {
    measurementsSchema
}