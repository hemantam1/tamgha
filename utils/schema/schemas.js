const { isAr } = require("../verify")
const arbConstant = require("./arbConstant")
const engConstant = require("./engConstant")


function getConstant(languageID) {
    if (isAr(languageID)) {
        return arbConstant
    } return engConstant
}


function productSchema(constant) {
    return {
        include: ['prodID', constant.hotel, 'hotPricePerNight', constant.hotcurrency, constant.hotaddress, 'hotTelephoneNo',
            constant.hotemail, 'ratings', 'hot_rooms', 'hot_meals', 'hot_activities'],
        as: { prodID: "productId", hotNameAr: "hotName", hotPriceCurrencyAr: 'hotPriceCurrency', hotAddressAr: "hotAddress" },
        assoc: {
            hot_rooms: roomSchema(constant),
            hot_meals: mealSchema(constant),
            hot_activities: activitySchema(constant)
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