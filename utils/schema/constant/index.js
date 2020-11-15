const { isAr } = require("../../verify")

const arbConstant = require("./arbConstant")
const engConstant = require("./engConstant")

function getConstant(languageID) {
    if (isAr(languageID)) {
        return arbConstant
    } return engConstant
}
module.exports = { getConstant }
