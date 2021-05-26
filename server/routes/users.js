const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');
var config = require('../config/databaseConfig.js');
var connection = config.connection

const async = require('async');

router.get("/auth", auth, (req, res) => {
    //console.log(req.user);
    //console.log(req.user.email);
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

/*Default ifs...*/
/*
if (results) {
    //console.log(results);
    return res.status(200).json({
        success: true
    });
}
else {
    console.log(error);
    return res.json({ success: false, error })
}
*/

router.post("/register", (req, res) => {
    var role = "0"; //default role
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var lastname = req.body.lastname;
    var image = req.body.image;
    var token = "";
    var tokenExp = "";

    /*Encryption*/
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, err })
        }
        password = hash;

        /*SQL*/
        var sql = "INSERT INTO fotoarchiv.users (role, email, password, name, lastname, image, token, tokenExp)  VALUES ?";
        var values = [
            [role, email, password, name, lastname, image, token, tokenExp]
        ];
        /*SQL*/

        /*SQL-QUERRY*/
        connection.query(sql, [values], function (err, result) {
            if (err) {
                //console.log(err)
                return res.json({ success: false, err })
            } else {
                return res.status(200).json({
                    success: true
                });
            }
        });
        /*SQL-QUERRY*/
    })
    /*Encryption*/
});

router.post("/login", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    /*SQL-QUERRY*/
    connection.query(
        "SELECT * FROM fotoarchiv.users u WHERE u.email = ?",
        email,
        (err, result) => {
            if (err) {
                console.log("1")
                return res.json({
                    loginSuccess: false,
                    message: "Auth failed " + err
                });
            }
            if (result.length > 0) {
                //console.log(result[0].password);
                /*ENCRYPTION-COMPARE-PASSWORD*/
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        /*GENERATE-COOKIES/TOKEN*/
                        //console.log(result[0]._id)
                        var token = jwt.sign(result[0]._id, 'secret')
                        var oneHour = moment().add(1, 'hour').valueOf();
                        //console.log(token);
                        //console.log(oneHour)

                        /*SQL*/
                        var sql = "update fotoarchiv.users u set u.token = ?, u.tokenExp = ? where u._id = ?";
                        var values = [
                            token,
                            oneHour,
                            result[0]._id
                        ];
                        /*SQL*/

                        /*SQL-QUERRY*/
                        connection.query(sql, values, function (err, result1) {
                            if (err) {
                                //console.log(err)
                                return res.json({
                                    loginSuccess: false,
                                    message: "err"
                                });
                            } else {
                                return res
                                    .cookie("w_auth", token)
                                    .cookie("w_authExp", oneHour)
                                    .status(200)
                                    .json({
                                        loginSuccess: true, userId: result[0]._id
                                    });
                            }
                        });
                        /*SQL-QUERRY*/

                        /*if (err) return res.status(400).send(err);
                        res.cookie("w_authExp", user.tokenExp);
                        res
                            .cookie("w_auth", user.token)
                            .status(200)
                            .json({
                                loginSuccess: true, userId: user._id
                            });
                            */
                        /*GENERATE-COOKIES/TOKEN*/
                    } else {
                        console.log("3")
                        return res.json({ loginSuccess: false, message: "Wrong password for this E-Mail" });
                    }
                });
                /*ENCRYPTION-COMPARE-PASSWORD*/
            } else {
                console.log("4")
                return res.json({
                    loginSuccess: false,
                    message: "Auth failed, email not found"
                });
            }
        }
        /*SQL-QUERRY*/
    );

    /*
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
    */
});

router.get("/logout", auth, (req, res) => {
    /*SQL*/
    var sql = "update fotoarchiv.users u set u.token = ?, u.tokenExp = ? where u._id = ?";
    var values = [
        "",
        "",
        req.user._id
    ];
    /*SQL*/

    /*SQL-QUERRY*/
    connection.query(sql, values, function (err, result1) {
        if (err) {
            //console.log(err)
            return res.json({
                success: false,
                err
            });
        } else {
            return res
                .status(200)
                .send({
                    success: true
                });
        }
    });
    /*SQL-QUERRY*/
    /*
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
    */
});


router.post("/getAllUsers", auth, (req, res) => {
    /*SQL*/
    var sql = "select u._id, u.role, u.email from fotoarchiv.users u";
    /*SQL*/

    /*SQL-QUERRY*/
    connection.query(sql, function (err, result) {
        if (err) {
            return res.json({
                success: false,
                error: err
            });
        } else {
            return res
                .status(200)
                .send({
                    success: true,
                    users: result
                });
        }
    });
    /*SQL-QUERRY*/ 
});

router.post("/editSingle", auth, (req, res) => {

    /*SQL*/
    var role = 0;
    if(req.body.role === 0){
        role = 1;
    }
    var sql = "update fotoarchiv.users u set u.role = ? where u._id = ?";
    var values = [
        role, 
        req.body._id
    ];
    /*SQL*/

    /*SQL-QUERRY*/
    connection.query(sql, values, function (err, result) {
        if (err) {
            return res.json({
                success: false,
                error: err
            });
        } else {
            return res
                .status(200)
                .send({
                    success: true
                });
        }
    });
    /*SQL-QUERRY*/ 
});


module.exports = router;
