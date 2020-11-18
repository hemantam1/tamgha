const Followers = require("../models/followers.model")
const Likes = require("../models/likes.model")

function insertingData(_b, id) {
    let payload = {}
    let body = Object.keys(_b)
    for (let i = 0; i < body.length; i++) {
        if (_b[body[i]] !== id) {
            payload[body[i]] = _b[body[i]]
        }
    }
    return payload
}

function getUserDetails(user) {
    let object = {
        isAdmin: false
    }
    // console.log(user.dataValues.prefferedLanguageCode, "LANGUAGE CODE")
    if (user !== undefined) {

        if (user.dataValues.userType === 'Admin') {
            object.isAdmin = true
        }
        if (user.dataValues.prefferedLanguageCode) {
            object.lang = user.dataValues.prefferedLanguageCode
        }
        object.userId = user.dataValues.userID
        return object
    }
    object.isGuest = true
    return object
}

const getDataWithLikes = (async (data, userId) => {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        // console.log(data[i].productID)
        let obj = data[i]
        if (data[i].productID) {
            await Likes.findOne({
                where: {
                    product_id: data[i].productID,
                    user_id: userId
                }
            }).then(a => {
                if (a) {
                    obj['userLikeIt'] = true
                } else {
                    obj['userLikeIt'] = false
                }
            })
        }
        arr.push(obj)
    }
    return arr
})

const getDataWithFollowers = (async (data, userId) => {
    let array = []
    for (let i = 0; i < data.length; i++) {
        let arr = [];
        // console.log(data[i], "SD")
        for (let j = 0; j < data[i].length; j++) {
            let obj = data[i][j]
            // console.log(obj, "OBJ")
            if (data[i][j].userID) {
                await Followers.findOne({
                    where: {
                        follower_user_id: data[i][j].userID,
                        user_id: userId
                    }
                }).then(a => {
                    if (a) {
                        obj['user_followed_him'] = true
                    } else {
                        obj['user_followed_him'] = false
                    }
                })
            }
            arr.push(obj)
        }
        array.push(arr)
    }
    return array
})

module.exports = { insertingData, getUserDetails, getDataWithLikes, getDataWithFollowers };
