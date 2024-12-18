const sqlite3 = require('sqlite3').verbose();
const { viewedCityNamesTotal } = require('./prometheus_metrics')

const db = new sqlite3.Database('easy_api.db')

const insertDb = (input) => {
    const query = `INSERT INTO cities (ID, COUNTRY, CAPITAL) VALUES (${input.id}, '${input.country}', '${input.city}')`
    db.run(query);
    db.close
}

function selectDb(input) {
    const query = `SELECT * FROM cities WHERE id=${input}`
    return new Promise((resolve, reject) => {      
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          viewedCityNamesTotal.inc({
            cityName: rows[0].CAPITAL
          });
          resolve(rows);
        }
      });
    }); 
  }

module.exports = {
    insertDb,
    selectDb
}