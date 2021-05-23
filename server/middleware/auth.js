//const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
var config = require('../config/databaseConfig.js');
var connection = config.connection

let auth = (req, res, next) => {
  let token = req.cookies.w_auth;

  if (token != null && token != "") {
    jwt.verify(token, 'secret', function (err, decode) {
      if (err) {
        console.log(err);
        return res.json({
          isAuth: false,
          error: true
        });
      }
      /*SQL*/
      //console.log(decode)
      //console.log(token)
      var sql = "SELECT * FROM fotoarchiv.users u where u._id = ? and u.token = ?";
      var values = [
        decode,
        token
      ];
      /*SQL*/

      /*SQL-QUERRY*/
      connection.query(sql, values, function (err, result) {
        if (result.length <= 0) {
          //console.log("auth failed");
          return res.json({
            isAuth: false,
            error: true
          });
        } else {
          //console.log(result[0]);
          req.token = token;
          req.user = result[0];
          next();
          /*return res.status(200).json({
            success: true
          });*/
        }
      });
      /*SQL-QUERRY*/

      /*user.findOne({ "_id": decode, "token": token }, function (err, user) {
        if (err) return cb(err);
        cb(null, user);
      })*/
    })
  } else {
    return res.json({
      isAuth: false,
      error: true
    });
  }
  /*
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });

    req.token = token;
    req.user = user;
    next();
  });
  */
};

module.exports = { auth };
