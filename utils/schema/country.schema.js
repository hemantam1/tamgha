
function countrySchema(constant) {
    return {
        include: ['countryID', constant.country],
        as: { countryAr: 'country' },
    }
}


module.exports = {
    countrySchema

}