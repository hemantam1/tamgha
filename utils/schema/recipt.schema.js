const { userSchema } = require("./user.schema")

function reciptSchema(constant) {
    return {
        include: ['reciptID', 'order', 'Buyer', 'Seller'],
        // as: { categoryAr: 'category' },
        assoc: {
            Buyer: userSchema(constant),
            Seller: userSchema(constant),

        },
    }
}


module.exports = {
    reciptSchema
}