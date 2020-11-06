const { isAr } = require("../verify")
const arbConstant = require("./arbConstant")
const engConstant = require("./engConstant")


function getConstant(languageID) {
    if (isAr(languageID)) {
        return arbConstant
    } return engConstant
}
function userCategorySchema(constant) {
    return {
        include: [constant.usrCatName],
        as: { usrCatNameAr: 'usrCatName' }
    }
}
function userSchema(constant) {
    return {
        include: ['userId', 'userName', 'profilePhoto', constant.firstName, constant.lastName, 'phoneNo', constant.country, 'user_category'],
        as: { firstNameAr: 'firstName', lastNameAr: "lastName", countryAr: "country" },
        assoc: {
            user_category: userCategorySchema(constant),
        }
    }
}
function categorySchema(constant) {
    return {
        include: ['catID', constant.catName],
        as: { catNameAr: 'catName' },
    }

}
function subCategorySchema(constant) {
    return {
        include: ['subCatID', constant.subCatName, 'category'],
        as: { subCatNameAr: 'subCatName' },
        assoc: {
            category: categorySchema(constant)
        }
    }
}
function productSchema(constant) {
    return {
        include: ['productID', constant.product, constant.productDescription, constant.productCurrency, 'price', 'user', 'sub_category'],
        as: { productNameAr: "productName", productDescriptionAr: "productDescription", priceCurrencyAr: "priceCurrency" },
        assoc: {
            user: userSchema(constant),
            sub_category: subCategorySchema(constant)
        }
    }
}

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


module.exports = {
    getProductSchema,
    getExploreSchema
}