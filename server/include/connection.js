var mysql = require('mysql')

module.exports = function (database = 'tron_fuel'){
   return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3001'
  })
}
// connection.getConnection(function(err, connection) {
//     // connected! (unless `err` is set)
//     console.log('connected');
//   });
 