const { getConstant } = require('./constant')
const { cartSchema } = require("./cart.schema")
const { productSchema } = require("./product.schema")
const { citySchema } = require('./city.schema')
const { countrySchema } = require('./country.schema')
const { stateSchema } = require('./state.schema')
const { userSchema } = require('./user.schema')
const { commentSchema } = require('./comment.schema')
const { deliveryAddressSchema } = require('./deliveryAddress.schema')
const { categorySchema } = require('./category.schema')
const { favouriteSchema } = require('./favourite.schema')
const { followerSchema } = require('./followers.schema')
const { likesSchema } = require('./likes.schema')
const { measurementsSchema } = require('./measurements.schema')
const { measureTypeSchema } = require('./measureType.schema')
const { mediaSchema } = require('./media.schema')
const { orderSchema } = require('./orders.schema')
const { privateMessagesSchema } = require('./privatemessage.schema')
const { productDetailSchema } = require('./productDetail.schema')
const { reciptSchema } = require('./recipt.schema')
const { shipDetailSchema } = require('./shipDetails.schema')
const { shippingAddressSchema } = require('./shippingaddress.schema')
const { subCategorySchema } = require('./subCategory.schema')
const { transactionSchema } = require('./transaction.schema')
const { userCategorySchema } = require('./userCategory.schema')



function getExploreSchema() {
    return { include: ['productID'] }
}
function getCartSchema(languageID) {
    return cartSchema(getConstant(languageID))
}
function getCategorySchema(languageID) {
    return categorySchema(getConstant(languageID))
}
function getCitySchema(languageID) {
    return citySchema(getConstant(languageID))
}
function getCountrySchema(languageID) {
    return countrySchema(getConstant(languageID))
}
function getCommentSchema(languageID) {
    return commentSchema(getConstant(languageID))
}
function getDeliveryAddressSchema(languageID) {
    return deliveryAddressSchema(getConstant(languageID))
}
function getFavouriteSchema(languageID) {
    return favouriteSchema(getConstant(languageID))
}
function getFollowerSchema(languageID) {
    return followerSchema(getConstant(languageID))
}
function getLikeSchema(languageID) {
    return likesSchema(getConstant(languageID))
}
function getMeasurementsSchema(languageID) {
    return measurementsSchema(getConstant(languageID))
}
function getMeasurementTypeSchema(languageID) {
    return measureTypeSchema(getConstant(languageID))
}
function getMediaSchema(languageID) {
    return mediaSchema(getConstant(languageID))
}
function getOrderSchema(languageID) {
    return orderSchema(getConstant(languageID))
}
function getPrivateMessageSchema(languageID) {
    return privateMessagesSchema(getConstant(languageID))
}
function getProductDetailSchema(languageID) {
    return productDetailSchema(getConstant(languageID))
}
function getReciptSchema(languageID) {
    return reciptSchema(getConstant(languageID))
}
function getShipDetailSchema(languageID) {
    return shipDetailSchema(getConstant(languageID))
}
function getShippingAddressSchema(languageID) {
    return shippingAddressSchema(getConstant(languageID))
}
function getStateSchema(languageID) {
    return stateSchema(getConstant(languageID))
}
function getSubCategorySchema(languageID) {
    return subCategorySchema(getConstant(languageID))
}
function getTransactionSchema(languageID) {
    return transactionSchema(getConstant(languageID))
}
function getProductSchema(languageID) {
    return productSchema(getConstant(languageID))
}
function getUserSchema(languageID) {
    return userSchema(getConstant(languageID))
}
function getUserCategorySchema(languageID) {
    return userCategorySchema(getConstant(languageID))
}
module.exports = {
    getCartSchema,
    getCategorySchema,
    getCitySchema,
    getCommentSchema,
    getCountrySchema,
    getDeliveryAddressSchema,
    getFavouriteSchema,
    getFollowerSchema,
    getLikeSchema,
    getMeasurementsSchema,
    getMeasurementTypeSchema,
    getMediaSchema,
    getOrderSchema,
    getPrivateMessageSchema,
    getProductSchema,
    getProductDetailSchema,
    getReciptSchema,
    getShipDetailSchema,
    getShippingAddressSchema,
    getStateSchema,
    getSubCategorySchema,
    getTransactionSchema,
    getUserSchema,
    getUserCategorySchema,
    getExploreSchema,

}