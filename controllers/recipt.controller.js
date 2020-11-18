const Sequelize = require('sequelize');
const Recipts = require('../models/recipts.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getReciptsSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { getReciptSchema } = require('../utils/schema/schemas');
const { User } = require('../models/associations');

exports.add = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;
    let payload = {
        order_id: _b.order_id,
        buyer_user_id: userId,
        // Join Two tables Orders, Product, Users.
        // fetch from order_id --> product_id --> user_id 
        // seller_user_id: user_id
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
                reciptID: _b.reciptID,
                seller_user_id: userId
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
    const { isAdmin, userId, lang } = getUserDetails(req.user)
    const _b = req.body

    if (isAdmin) {
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
    }

    Recipts.findAll({
        where: {
            buyer_user_id: userId
        },
        include: [
            { model: User },
        ]
    })
        .then(c => {

            if (!c) throw new Error('No Recipts found!');

            let schema = getReciptSchema(lang)

            let data = Serializer.serializeMany(c, Recipts, schema);
            res.status(200).json({ status: true, data });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)

    if (req.params.sold) {
        Recipts.findAll({
            where: {
                seller_user_id: userId
            }
        })
            .then(c => {

                if (!c) throw new Error('No Recipts found!');

                let schema = getReciptSchema(lang)

                let data = Serializer.serializeMany(c, Recipts, schema);
                res.status(200).json({ status: true, data });
                return
            })
            .catch(err => {
                console.error(err);
                res.status(400).json({ status: false });
            });
    }

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
