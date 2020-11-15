
function categorySchema(constant) {
    return {
        include: ['categoryID', constant.catName],
        as: { categoryAr: 'category' },
    }
}


module.exports = {
    categorySchema
}