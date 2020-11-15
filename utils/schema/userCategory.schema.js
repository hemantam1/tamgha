function userCategorySchema(constant) {
    return {
        include: [constant.usrCatName],
        as: { userCategoryAr: 'userCategory' }
    }
}



module.exports = {
    userCategorySchema
}