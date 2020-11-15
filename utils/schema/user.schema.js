const { userCategorySchema } = require("./userCategory.schema")

function userSchema(constant) {
    return {
        include: ['userId', 'userName', 'profilePhoto', constant.firstName, constant.lastName, 'phoneNo', 'user_category'],
        as: { firstNameAr: 'firstName', lastNameAr: "lastName" },
        assoc: {
            user_category: userCategorySchema(constant),
        }
    }
}


module.exports = {
    userSchema
}