const { userSchema } = require("./user.schema")

function privateMessagesSchema(constant) {
    return {
        include: ['messageID', 'message', 'user'],
        // as: { categoryAr: 'category' },
        assoc: {
            user: userSchema(constant),
        },
    }
}


module.exports = {
    privateMessagesSchema
}