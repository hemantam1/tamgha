const { userSchema } = require("./user.schema")

function followerSchema(constant) {
    return {
        include: ['followerID', 'followerUser'],
        assoc: {
            followerUser: userSchema(constant),
        }
    }
}


module.exports = {
    followerSchema
}