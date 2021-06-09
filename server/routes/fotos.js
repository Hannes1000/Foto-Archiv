const express = require('express');
const router = express.Router();
var config = require('../config/databaseConfig.js');
const { auth } = require("../middleware/auth");
const multer = require("multer");
var connection = config.connection;
const fs = require('fs');


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
            return cb(res.status(400).end('only jpg, png, tif are allowed'), false);
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

router.post("/deleteImage", auth, (req, res) => {
    console.log(req.body.image)
    try {
        fs.unlinkSync("./" + req.body.image);
        //file removed
    } catch (err) {
        //console.error(err)
        return res.json({ success: false, error: err })
    }
    return res.json({ success: true })
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
    var sql = "Select * from fotoarchiv.fotos f, fotoarchiv.locations l " +
        "where f._id = l._fotosid";

    /*SQL-QUERRY*/
    connection.query(sql, function (err, result) {
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
    const filterCopyrightSource = req.body.filterCopyrightSource
    const filterAuthor = req.body.filterAuthor
    const filtercreationDate = req.body.filtercreationDate
    const filterTitle = req.body.filterTitle
    const ilterImageMaterial = req.body.filterImageMaterial
    const filterCountry = req.body.filterCountry
    const filterCity = req.body.filterCity
    const mainTag = req.body.mainTag
    const filterDescription = req.body.filterDescription

    var values = [
    ];

    var sql = "Select * from fotoarchiv.fotos as f, fotoarchiv.locations l " +
        "where f._id = l._fotosid ";


    if (mainTag !== "false") {
        sql += "and f.mainTag = ?";
        values.push(mainTag);
    }

    var sqlUseFilterValueStart = "and (";
    var sqlUseFilterValueEnd = ")";
    var sqlFilterValue = "";
    var setLastOr = false;

    if (filterCopyrightSource === true) {
        setLastOr = true;
        sqlFilterValue += "f.copyrightSource LIKE ?";
        values.push("%" + req.body.searched + "%");
    }
    if (filterAuthor === true) {
        if (setLastOr === true) {
            sqlFilterValue += " OR "
        }
        setLastOr = true;
        sqlFilterValue += "f.author LIKE ?"
        values.push("%" + req.body.searched + "%");
    }
    if (filtercreationDate === true) {
        if (setLastOr === true) {
            sqlFilterValue += " OR "
        }
        setLastOr = true;
        sqlFilterValue += "f.creationDate LIKE ?"
        values.push("%" + req.body.searched + "%");
    }
    if (filterTitle === true) {
        if (setLastOr === true) {
            sqlFilterValue += " OR "
        }
        setLastOr = true;
        sqlFilterValue += "f.title LIKE ?"
        values.push("%" + req.body.searched + "%");
    }
    if (ilterImageMaterial === true) {
        if (setLastOr === true) {
            sqlFilterValue += " OR "
        }
        setLastOr = true;
        sqlFilterValue += "f.imageMaterial LIKE ?"
        values.push("%" + req.body.searched + "%");
    }
    if (filterCountry === true) {
        if (setLastOr === true) {
            sqlFilterValue += " OR "
        }
        setLastOr = true;
        sqlFilterValue += "l.country LIKE ?"
        values.push("%" + req.body.searched + "%");
    }
    if (filterDescription === true) {
        if (setLastOr === true) {
            sqlFilterValue += " OR "
        }
        setLastOr = true;
        sqlFilterValue += "f.description LIKE ?"
        values.push("%" + req.body.searched + "%");
    }
    if (filterCity === true) {
        if (setLastOr === true) {
            sqlFilterValue += " OR "
        }
        setLastOr = true;
        sqlFilterValue += "l.city LIKE ?"
        values.push("%" + req.body.searched + "%");
    }

    if (setLastOr === false) {
        sqlUseFilterValueStart = "";
        sqlUseFilterValueEnd = "";
    }

    sql += sqlUseFilterValueStart + sqlFilterValue + sqlUseFilterValueEnd;

    // console.log(sql);
    // console.log(values);

    //console.log(sql);
    // console.log(req.body.filterCopyrightSource)
    // console.log(req.body.filterAuthor)
    // console.log(req.body.filtercreationDate)
    // console.log(req.body.filterTitle)
    // console.log(req.body.filterImageMaterial)
    // console.log(req.body.filterCountry)
    // console.log(req.body.filterCity)

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

    var sql = "insert into fotoarchiv.tags (name) values (?);" +
        "select LAST_INSERT_ID() as _id";
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


router.post("/getFotoById", auth, (req, res) => {

    var sql = "select * from fotoarchiv.fotos f, fotoarchiv.locations l where f._id = ? and f._id = l._fotosid"
    values = [
        req.body._id
    ];

    /*SQL-QUERRY*/
    connection.query(sql, values, function (err, result) {
        if (err) {
            console.log(err)
            return res.json({ success: false, error: err })
        } else {
            return res.status(200).json({
                success: true,
                fotoData: result
            });
        }
    });
    /*SQL-QUERRY*/
});

router.post("/updatePicture", auth, (req, res) => {

    //const _userid = req.body._userid;
    const _id = req.body._id
    const originalImage = req.body.originalImage
    const compressedImage = req.body.compressedImage
    const copyrightSource = req.body.copyrightSource
    const author = req.body.author
    const mainTag = req.body.mainTag
    const description = req.body.description
    //const uploadDate = req.body.uploadDate
    const creationDate = req.body.creationDate
    const title = req.body.title
    const gpsLocation = req.body.gpsLocation
    const country = req.body.country
    const city = req.body.city
    const imageMaterial = req.body.imageMaterial
    const tags = req.body.tags

    var sql = "UPDATE fotoarchiv.fotos f, fotoarchiv.locations l " +
        "set f.originalImage = ?, f.compressedImage = ?, f.copyrightSource = ?, f.author = ?, f.mainTag = ?, f.description = ?, f.creationDate = ?, f.title = ?, f.imageMaterial = ?, l.gpsLocation = ?, l.country = ?, l.city = ? " +
        "where f._id = ? AND l._fotosid = ?;"
    values = [
        originalImage,
        compressedImage,
        copyrightSource,
        author,
        mainTag,
        description,
        creationDate,
        title,
        imageMaterial,
        gpsLocation,
        country,
        city,
        _id,
        _id
    ];

    /*SQL-QUERRY*/
    connection.query(sql, values, function (err, result) {
        if (err) {
            console.log(err)
            return res.json({ success: false, error: err })
        } else {
            return res.status(200).json({
                success: true
            });
        }
    });
    /*SQL-QUERRY*/
});

module.exports = router;
