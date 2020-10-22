
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


let body = {
    firstName: "Mohammed",
    lastName: "Zafar",
    age: 24,
    otherData: null,
    hobbies: ["playing", "reading"],
    familyData: {
        otherData: null,
        fatherName: "Mohammed Sharfuddin",
        age: 42,
        children: {
            first: "Myself",
            second: "MyelderSis",
            third: "MyyoungerBro",
            fourth: "MyyoungerSis",
        }
    }
}

// giveRequireData(body).then(
//     w => console.log(w)
// )

function giveRequireData(body) {

    let keys = Object.keys(body)
    let eachData = body
    let data = {}
    for (let i = 0; i < keys.length; i++) {

        if (typeof (eachData[keys[i]]) === "string" || typeof (eachData[keys[i]]) === "number") {
            data[keys[i]] = eachData[keys[i]]
        }
        if (typeof (eachData[keys[i]]) === "object") {
            // console.log("NEW", "Object")
            if (eachData[keys[i]] === null) {
                data[keys[i]] = eachData[keys[i]]
            }
            else if (eachData[keys[i]][0]) {
                getArrayData(eachData[keys[i]])
                    .then(ary => data[keys[i]] = ary)
                    .catch(er => console.log(er))
            }
            else if (Object.keys(eachData[keys[i]])[0]) {
                giveRequireData(eachData[keys[i]])
                    .then(obj =>
                        data[keys[i]] = obj)
                    .catch(er => console.log(er))
            }
        }
    }
    return data
}

let array = [
    "zafar$$",
    44,
    null,
    ["hel", "OOO"],
    {
        firstName: "Mohammed"
    }, {
        lastName: "Zafar",
    }, { age: 24 }, {
        otherData: null,
        hobbies: ["playing", "reading"],
    }, {
        familyData: {
            otherData: null,
            fatherName: "Mohammed Sharfuddin",
            age: 42,
            children: {
                first: "Myself",
                second: "MyelderSis",
                third: "MyyoungerBro",
                fourth: "MyyoungerSis",
            }
        }
    }
]
// let result = getArrayData(array).then(e =>
//     console.log(e)
// )

function getArrayData(array) {

    let data = []
    for (let i = 0; i < array.length; i++) {
        let eachData = array[i]

        if (typeof (eachData) === "string" || typeof (eachData) === "number") {
            data.push(eachData)
        }
        if (typeof (eachData) === "object") {
            if (eachData === null) {
                data.push(eachData)
            }
            else if (eachData[0]) {
                getArrayData(eachData).then(
                    ar =>
                        data.push(ar)
                )
                    .catch(er => console.log(er))

            }
            else if (Object.keys(eachData)[0]) {
                giveRequireData(eachData)
                    .then(
                        r =>
                            data.push(r)
                    )
                    .catch(er => console.log(er))

            }
        }
    } return data

}



module.exports = { insertingData, getArrayData, giveRequireData };
