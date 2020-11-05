const { isAr } = require("../verify")
const arbConstant = require("./arbConstant")
const engConstant = require("./engConstant")


function getConstant(languageID) {
    if (isAr(languageID)) {
        return arbConstant
    } return engConstant
}
function categorySchema(category) {
    return {
        include: [],
        as: {}
    }
}
function userSchema(constant) {
    return {
        include: [],
        as: {},
        assoc: {
            user_category: "",
        }
    }
}

function productSchema(constant) {
    return {
        include: ['productID', constant.product, constant.productDescription, constant.productCurrency, 'price'],
        as: { productNameAr: "productName", productDescriptionAr: "productDescription", priceCurrencyAr: "priceCurrency" },
        assoc: {
            users: userSchema(constant),
            sub_categories: subCategorySchema(constant)
        }
    }
}


function getMealSchema(languageID) {
    return mealSchema(getConstant(languageID))
}


module.exports = {
    getActivitySchema,
    getAirwaySchema,
    getBaggageSchema,
    getCitySchema,
    getCountrySchema,
    getContinentSchema,
    getTripTypeSchema,
    getPackageSchema,
    getFlightSchema,
    getHotelSchema,
    getMealSchema,
    getRoomSchema,
    getTravelAgencySchema
}