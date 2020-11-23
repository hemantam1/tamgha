const { userSchema } = require("./user.schema")

function followerSchema(constant) {
    return {
        include: ['followerID', 'user_id', 'followerUser'],
        assoc: {
            followerUser: userSchema(constant),
        }
    }
}


module.exports = {
    followerSchema
}