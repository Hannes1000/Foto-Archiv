const express = require('express');
const router = express.Router();
var config = require('../config/databaseConfig.js');
const { auth } = require("../middleware/auth");
const multer = require("multer");
var connection = config.connection;


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png' || ext !== '.tif') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post("/uploadImage", auth, (req, res) => {
    //after getting imgage from client save it
    upload(req, res, err => {
        // console.log(res.req.file.path)
        // console.log("uploads/"+res.req.file.filename)
        if (err) return res.json({ success: false, err })
        //return res.json({success: true, image: res.req.file.path, fileName: res.req.file.filename})
        return res.json({ success: true, image: "uploads/" + res.req.file.filename, fileName: res.req.file.filename })
    })
});

router.post("/uploadFoto", auth, (req, res) => {

    const _userid = req.body._userid;
    const originalImage = req.body.originalImage
    const compressedImage = req.body.compressedImage
    const copyrightSource = req.body.copyrightSource
    const author = req.body.author
    const mainTag = req.body.mainTag
    const description = req.body.description
    const uploadDate = req.body.uploadDate
    const creationDate = req.body.creationDate
    const title = req.body.title
    const gpsLocation = req.body.gpsLocation
    const country = req.body.country
    const city = req.body.city
    const imageMaterial = req.body.imageMaterial
    const tags = req.body.tags

    /*SQL-Insert foto*/
    var sql = "Insert into fotoarchiv.fotos (originalImage, compressedImage, copyrightSource, author, mainTag, uploadDate, creationDate, title, _usersid, description, imageMaterial)" +
        "values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
    var values = [
        originalImage,
        compressedImage,
        copyrightSource,
        author,
        mainTag,
        uploadDate,
        creationDate,
        title,
        _userid,
        description,
        imageMaterial
    ];

    connection.query(sql, values, function (err, result) {
        if (err) {
            //console.log(err)
            return res.json({ success: false, error: err })
        } else {

            /*SQL-Select inserted Foto-ID*/
            var sql = "select LAST_INSERT_ID() as _fotosid"

            connection.query(sql, function (err, result) {
                if (err) {
                    //console.log(err)
                    return res.json({ success: false, error: err })
                } else {
                    const _fotosid = result[0]._fotosid;

                    /*SQL-Insert Location*/
                    var sql = "Insert into fotoarchiv.locations (gpsLocation, country, city, _fotosid)" +
                        "values (?, ?, ?, ?);"
                    var values = [
                        gpsLocation,
                        country,
                        city,
                        _fotosid
                    ];

                    connection.query(sql, values, function (err, result) {
                        if (err) {
                            //console.log(err)
                            return res.json({ success: false, error: err })
                        } else {
                            if (tags.length > 0) {
                                /*SQL-Insert Tags*/
                                var sql = "";
                                var sqlInsert = "Insert into fotoarchiv.getsdefinedby (_tagsid, _fotosid)" +
                                    "values (?, ?);"
                                var values = [];

                                for (let i = 0; i < tags.length; i++) {
                                    var _tagsid = tags[i].id;
                                    sql += sqlInsert;
                                    values.push(_tagsid);
                                    values.push(_fotosid);
                                }
                                //console.log(sql);
                                //console.log(values);

                                connection.query(sql, values, function (err, result) {
                                    if (err) {
                                        //console.log(err)
                                        return res.json({ success: false, error: err })
                                    } else {
                                        return res.status(200).json({
                                            success: true
                                        });
                                    }
                                });
                            } else {
                                return res.status(200).json({
                                    success: true
                                });
                            }
                        }
                    });
                }
            });
        }
    });
});

router.post("/allFotos", auth, (req, res) => {
    var sql = "Select * from fotoarchiv.fotos"

    /*SQL-QUERRY*/
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            return res.json({ success: false, err })
        } else {
            return res.status(200).json({
                success: true,
                fotos: result
            });
        }
    });
    /*SQL-QUERRY*/
});

router.post("/allTags", auth, (req, res) => {

    var sql = "Select * from fotoarchiv.tags"

    /*SQL-QUERRY*/
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            return res.json({ success: false, error: err })
        } else {
            return res.status(200).json({
                success: true,
                tags: result
            });
        }
    });
    /*SQL-QUERRY*/
});

router.post("/searchFotos", auth, (req, res) => {

    var sql = "Select * from fotoarchiv.fotos as f " +
        "where " +
        "f.copyrightSource LIKE ? OR " +
        "f.author LIKE ? OR " +
        "f.description LIKE ? OR " +
        "f.creationDate LIKE ? OR " +
        "f.title LIKE ? OR " +
        "f.imageMaterial LIKE ? ";

    const values = [
        "%" + req.body.searched + "%",
        "%" + req.body.searched + "%",
        "%" + req.body.searched + "%",
        "%" + req.body.searched + "%",
        "%" + req.body.searched + "%",
        "%" + req.body.searched + "%"
    ];

    /*SQL-QUERRY*/
    connection.query(sql, values, function (err, result) {
        if (err) {
            console.log(err)
            return res.json({ success: false, error: err })
        } else {
            return res.status(200).json({
                success: true,
                fotos: result
            });
        }
    });
    /*SQL-QUERRY*/
});

router.post("/addTag", auth, (req, res) => {

    var sql = "insert into fotoarchiv.tags (name) values (?); select LAST_INSERT_ID() as _id"
    values = [
        req.body.name
    ];

    /*SQL-QUERRY*/
    connection.query(sql, values, function (err, result) {
        if (err) {
            console.log(err)
            return res.json({ success: false, error: err })
        } else {
            return res.status(200).json({
                success: true,
                tagid: result
            });
        }
    });
    /*SQL-QUERRY*/
});


module.exports = router;
