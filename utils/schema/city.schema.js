const { stateSchema } = require("./state.schema")

function citySchema(constant) {
    return {
        include: ['cityID', constant.city, 'state'],
        as: { cityAr: 'city' },
        assoc: {
            state: stateSchema(constant),
        }
    }
}


module.exports = {
    citySchema
}