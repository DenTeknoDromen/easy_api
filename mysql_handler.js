const mysql = require('mysql')

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'my_db'
});
 
connection.connect();
console.log("Connection started")

// connection.query(`SELECT * FROM cities WHERE id=${input}`, function (error, results, fields) {
//   if (error) throw error;
//   console.log(results[0].solution);
// });

function selectDb(input) {
    const query = `SELECT * FROM cities WHERE id=${input}`
    return new Promise((resolve, reject) => {      
      connection.query(query, (error, results, fields) => {
        if (err) {
          throw error;
        } else {
          resolve(results[0].solution);
        }
      });
    }); 
  }
 
connection.end();
console.log('Connection ended')

module.exports = {
    selectDb
}