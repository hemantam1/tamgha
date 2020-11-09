const multerService = require('multer');
const uuid = require('uuid').v4;
const server = require('../config/env').server

const storage = multerService({
    storage: multerService.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            // const name = Date.now() + '-' + file.originalname;
            const ext = file.originalname.split('.').pop();
            let uuidV4 = uuid()
            const name = uuidV4 + '.' + ext;
            console.log(name);
            let url = server.url + `:${server.port}` + '/uploads/' + name
            if (!req.dir) req.dir = [];
            req.dir.push({ id: uuidV4, format: file.mimetype, url: url, ext: ext });
            cb(null, name)
        }
    })
});

module.exports = storage

