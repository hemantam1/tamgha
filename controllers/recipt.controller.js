const Sequelize = require('sequelize');
const Recipts = require('../models/recipts.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getReciptsSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;
    let payload = {
        reciptType: _b.reciptType,
        order_id: _b.order_id,
        user_id: userId
    }


    Recipts.create(payload)
        .then(r => {
            res.status(200).json({ status: true, result: r });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({
                status: false,
                error: err
            });
        });
};

// exports.update = (req, res) => {
//     const { isAdmin, userId } = getUserDetails(req.user)
//     const _b = req.body;

//     if (!_b.reciptID) {
//         res.status(400).json({ status: false, message: "reciptID does not exists" });
//         return
//     }

//     let payload = insertingData(_b, _b.reciptID);

//     Recipts.update(payload,
//         {
//             where: {
//                 reciptID: _b.reciptID
//             }
//         }
//     )
//         .then(c => {
//             if (!c) throw new Error('No Recipts found!');
//             res.status(200).json({ status: true, category: c });
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(400).json({ status: false });
//         });
// };


exports.delete = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;

    if (!_b.reciptID) {
        res.status(400).json({ status: false, message: "reciptID does not exists" });
        return
    }


    Recipts.destroy(
        {
            where: {
                reciptID: _b.reciptID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Recipts found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body

    Recipts.findAll()
        .then(c => {

            if (!c) throw new Error('No Recipts found!');

            // let schema = getReciptsSchema(_b.languageID)

            // let data = Serializer.serializeMany(c, Recipts, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)

    Recipts.findOne({
        where: {
            reciptID: req.params.reciptID
        }
    })
        .then(c => {
            if (!c) throw new Error('No Recipts found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
