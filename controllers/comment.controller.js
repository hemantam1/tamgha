const Sequelize = require('sequelize');
const Comment = require('../models/comment.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
const { getActivitySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        comment: _b.comment,
        commentAr: _b.commentAr,
        usr_id: _b.usr_id,
        prod_id: _b.prod_id
    }
    Comment.create(payload)
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

exports.update = (req, res) => {
    const _b = req.body;

    if (!_b.comID) {
        res.status(400).json({ status: false, message: "comID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.comID);

    Comment.update(payload,
        {
            where: {
                comID: _b.comID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Activities found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if (!_b.comID) {
        res.status(400).json({ status: false, message: "comID does not exists" });
        return
    }


    Comment.destroy(
        {
            where: {
                comID: _b.comID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Comment found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    const _b = req.body
    Comment.findAll()
        .then(c => {

            if (!c) throw new Error('No Comment found!');

            // let schema = getActivitySchema(_b.languageID)

            // let data = Serializer.serializeMany(c, Comment, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    Comment.findOne({
        where: {
            comID: req.params.comID
        }
    })
        .then(c => {
            if (!c) throw new Error('No Comment found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
