const { subCategorySchema } = require("./subCategory.schema")
const { userSchema } = require("./user.schema")

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

module.exports = {
    productSchema
}