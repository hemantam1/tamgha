
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
    if (user.dataValues.userType === 'Admin') {
        object.isAdmin = true
    }
    object.userId = user.dataValues.userID
    return object
}


module.exports = { insertingData, getUserDetails };
