const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const router = express.Router();

const https = require('https');
const fs = require('fs');
/*var privateKey  = fs.readFileSync(path.join(__dirname,'key.pem'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname,'cert.pem'), 'utf8');
var credentials = {key: privateKey, cert: certificate};*/

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

/*
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Matura2021',
  database: 'fotoarchiv'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Database - FotoArchiv - Connected!');
});
*/
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/fotos', require('./routes/fotos'));

app.use('/uploads', express.static('uploads'));

//set port
const port = process.env.PORT || 5000

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    //res.sendFile(path.join(__dirname, "index.js"));
    //res.send("<p>Seite nicht vorhanden</p>")
  });

  //start server
  app.listen(port, () => {
    console.log(`Server Running at ${port}`)
  });
} else {
  //start https server
  https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'server.key'), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, 'server.cert'), 'utf8')
  }, app)
    .listen(port, function () {
      console.log('App listening on port ' + port + '! Link: https://localhost:' + port)
    })

}

/*
app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});*/

/*
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Server Running at ${port}`)
});
*/

