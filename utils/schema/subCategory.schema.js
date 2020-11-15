const { categorySchema } = require("./category.schema")

function subCategorySchema(constant) {
    return {
        include: ['subCategoryID', constant.subCatName, 'category'],
        as: { subCategoryAr: 'subCategory' },
        assoc: {
            category: categorySchema(constant)
        }
    }
}


module.exports = {
    subCategorySchema
}