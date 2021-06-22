var mysql = require('mysql');

config = {
   host: 'localhost',
   user: 'root',
   password: 'Matura2021',
   database: 'fotoarchiv',
   multipleStatements: true
}

var connection =mysql.createConnection(config);
connection.connect(function(err){
  if (err){
    console.log('error connecting:' + err.stack);
  }
  console.log('Connected to FotoArchivDatabase!!!');
});

module.exports ={
     connection : mysql.createConnection(config) 
} 