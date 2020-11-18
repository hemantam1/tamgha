const { userSchema } = require("./user.schema")

function reciptSchema(constant) {
    return {
        include: ['reciptID', 'order', 'user'],
        // as: { categoryAr: 'category' },
        assoc: {
            user: userSchema(constant),

        },
    }
}


module.exports = {
    reciptSchema
}