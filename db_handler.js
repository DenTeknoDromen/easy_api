const sqlite3 = require('sqlite3').verbose();

const insertDb = (input) => {
    const db = new sqlite3.Database('easy_api.db')
    const query = `INSERT INTO cities (ID, COUNTRY, CAPITAL) VALUES (${input.id}, '${input.country}', '${input.city}')`
    db.run(query);
    db.close
}

function selectDb(input) {
    const db = new sqlite3.Database('easy_api.db', sqlite3)
    const query = `SELECT * FROM cities WHERE id=${input}`
    return new Promise((resolve, reject) => {      
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }); 
  }
  
async function getData(input) {
    selectDb(input).then(response => console.log(response));
  }

module.exports = {
    insertDb,
    selectDb
}