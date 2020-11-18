
function userCategorySchema(constant) {
    return {
        include: ['userCategoryID', constant.usrCatName],
        as: { userCategoryAr: 'userCategory' }
    }
}



module.exports = {
    userCategorySchema
}