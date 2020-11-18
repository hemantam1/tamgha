const { citySchema } = require("./city.schema")
const { productSchema } = require("./product.schema")
const { userSchema } = require("./user.schema")

function shippingAddressSchema(constant) {
    return {
        include: ['addressID', constant.address, constant.area, 'pinCode', 'isTamghaShipping', 'phoneNo', constant.email, 'city', 'product'],
        as: { addressAr: 'address', areaAr: 'area', emailAr: 'email' },
        assoc: {
            city: citySchema(constant),
            product: productSchema(constant),
        }
    }
}


module.exports = {
    shippingAddressSchema
}