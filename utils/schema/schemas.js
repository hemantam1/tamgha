const { getConstant } = require('./constant')
const { cartSchema } = require("./cart.schema")
const { productSchema } = require("./product.schema")
const { citySchema } = require('./city.schema')
const { countrySchema } = require('./country.schema')
const { stateSchema } = require('./state.schema')



function getExploreSchema() {
    return {
        include: ['productID']
    }
}
// function getMealSchema(languageID) {
//     return mealSchema(getConstant(languageID))
// }
function getProductSchema(languageID) {
    return productSchema(getConstant(languageID))
}

function getCartSchema(languageID) {
    return cartSchema(getConstant(languageID))
}

function getCitySchema(languageID) {
    return citySchema(getConstant(languageID))
}

function getCountrySchema(languageID) {
    return countrySchema(getConstant(languageID))
}

function getStateSchema(languageID) {
    return stateSchema(getConstant(languageID))
}

module.exports = {
    getProductSchema,
    getExploreSchema,
    getCartSchema,
    getCitySchema,
    getCountrySchema,
    getStateSchema,
}