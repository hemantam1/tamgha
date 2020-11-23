const { citySchema } = require("./city.schema")
const { userSchema } = require("./user.schema")

function deliveryAddressSchema(constant) {
    return {
        include: ['addressID', constant.firstName, constant.lastName, constant.fullName, constant.address, constant.area, constant.block, constant.street, constant.avenue, 'houseNo', 'floorNo', 'flatNo', 'phoneNo', constant.email, constant.note, 'city'],
        as: { firstNameAr: 'firstName', lastNameAr: 'lastName', fullNameAr: 'fullName', addressAr: 'address', areaAr: 'area', blockAr: 'block', streetAr: 'street', avenueAr: 'avenue', emailAr: 'email', noteAr: 'note' },
        assoc: {
            city: citySchema(constant),
        }
    }
}


module.exports = {
    deliveryAddressSchema
}