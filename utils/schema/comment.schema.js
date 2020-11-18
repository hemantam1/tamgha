let arbConstant = require('./constant/arbConstant')
let engConstant = require('./constant/engConstant')
const { productSchema } = require('./product.schema')
const { userSchema } = require('./user.schema')

function commentSchema(constant) {
    return {
        include: ['commentID', constant.comment, 'product'],
        as: { commentAr: 'comment' },
        assoc: {
            product: productSchema(constant)
        }
    }
}


module.exports = {
    commentSchema
}