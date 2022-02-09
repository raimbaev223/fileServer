const express = require('express');
const {User, UserFile, Token} = require('../models/database')
const auth = require('../utils/auth');
const fs = require('fs');
const {fileExtension} = require('file-extension');
const mime = require('mime-types');
const {token} = require("morgan");
const multer = require('multer');
const {log} = require("debug");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './data/files');
    },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
const upload = multer({ storage: storage }).single("file");

const router = express.Router();

router.post('/', upload, async (req, res) => {
    const authHeader = req.headers['authorization'];
    const isTokenValid = auth(authHeader);

    if (!isTokenValid) {
        return res.sendStatus(401)
    }

    try {
        const fileModel = {
            link: `${req.file.destination}/${req.file.originalname}`,
            userId:  await Token.findOne({model: Token, where: {id: authHeader}}).then(tokens => tokens.dataValues.userId),
        };
        UserFile.create(fileModel).then(file => res.json(file))
    }
    catch (err) {
        return res.send('File not uploaded')
    }
});

router.delete('/:id',  async (req, res) => {
    const authHeader = req.headers['authorization'];
    const isTokenValid = auth(authHeader);

    if (!isTokenValid) {
        return res.sendStatus(401)
    }
    const id = req.params.id;

    try {
        const file = await UserFile.findOne({model: UserFile, where: {id: id}}).then(userFiles => userFiles.dataValues)
        UserFile.destroy({model: UserFile, where: {id: id}})
            .then(file => res.send('File deleted successfully'))

        fs.unlink(file.link, function(err){
            if (err) {
                console.log(err);
            } else {
                console.log("Файл удалён");
            }
        });
    }
    catch (err) {
        return res.send('File not found')
    }
})
module.exports = router;
