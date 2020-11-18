const { userSchema } = require("./user.schema")

function followerSchema(constant) {
    return {
        include: ['followerID', 'user',],
        assoc: {
            user: userSchema(constant),
        }
    }
}


module.exports = {
    followerSchema
}