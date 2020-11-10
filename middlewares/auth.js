// const User = require('../models/user.model.js')
// // const Admin = require('../models/admin')
// // const { decode } = require('../services/auth.service')
// const { use } = require('passport')

// const user = (req, res, next) => {
//     try {
//         let token = req.header('Authorization').split(' ')[1]
//         let check = decode(token)
//         if (check.flag) {
//             User.findOne({
//                 where: {
//                     id: check.id
//                 },
//                 raw: true
//             })
//                 .then(user => {
//                     if (user === null) throw new Error("No User found")
//                     req.isUser = true
//                     req.user = user
//                     next()
//                 })
//                 .catch(err => {
//                     console.error(err)
//                     res.send({
//                         status: false,
//                         error: err.message
//                     })
//                 })
//         }
//     } catch (err) {
//         console.error(err)
//         res.send({
//             status: false,
//             error: err.message
//         })
//     }
// }

// const admin = (req, res, next) => {
//     // console.log(req.body)
//     try {
//         let token = req.header('Authorization').split(' ')[1]
//         let check = decode(token)
//         // console.log(check)
//         if (check.flag) {
//             // Admin.findOne({
//             //     where: {
//             //         id: check.id
//             //     },
//             //     raw: true
//             // })
//             //     .then(user => {
//             //         if (user === null) throw new Error("No Admin found")
//             //         req.isAdmin = true
//             //         req.admin = user
//             //         next()
//             //     })
//             //     .catch(err => {
//             //         console.error(err)
//             //         res.send({
//             //             status: false,
//             //             error: err.message
//             //         })
//             //     })
//             console.log("ADMIN")
//         } else {
//             throw new Error('Invalid token')
//         }
//     } catch (err) {
//         console.error(err)
//         res.send({
//             status: false,
//             error: err.message
//         })
//     }
// }

// const guest = async (req, res, next) => {
//     try {
//         let token = req.header('Authorization').split(' ')[1]
//         let check = decode(token)

//         if (check.flag) {
//             await User.findOne({
//                 where: {
//                     id: check.id
//                 },
//                 raw: true
//             })
//                 .then(async user => {
//                     if (user == null) {
//                         await Admin.findOne({
//                             where: {
//                                 id: check.id
//                             },
//                             raw: true
//                         })
//                             .then(admin => {
//                                 if (admin === null) throw new Error("No Admin found")
//                                 req.isAdmin = true
//                                 req.admin = admin
//                                 // next()
//                             })
//                             .catch(err => {
//                                 req.isGuest = true
//                             })
//                     } else {
//                         req.isUser = true
//                         req.user = user
//                         // next()
//                     }
//                 })
//                 .catch(err => {
//                     req.isGuest = true
//                 })
//         }
//         next()

//     } catch (error) {
//         next()
//     }

// }

module.exports = {
    user:"user",
    admin:"admin",
    guest:"guest"
}