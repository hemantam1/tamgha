const { countrySchema } = require("./country.schema")

function stateSchema(constant) {
    return {
        include: ['stateID', constant.state, 'country'],
        as: { stateAr: 'state' },
        assoc: {
            country: countrySchema(constant),
        }
    }
}


module.exports = {
    stateSchema
}