const mariadb = require('mariadb');

const pool = mariadb.createPool({
     host: process.env.DB_URL || "localhost", 
     user: process.env.MARIADB_USER || "api-user", 
     password: process.env.MARIADB_PASSWORD || "password",
     database: process.env.database || "easy-api", 
     connectionLimit: 5
});

async function selectDb(input) {
    const query = `SELECT * FROM cities WHERE id=${input}`
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(query);
        return rows
    } finally {
        if (conn) conn.release(); //release to pool
    }
}

async function insertDb(input) {
    const country = input.country
    const city = input.city
    const id = input.id
    const query = "INSERT INTO cities value (?, ?, ?)"
    let conn;
    try {
        conn = await pool.getConnection();
        return await conn.query(query, [country, city, id]);
    } finally {
        if (conn) conn.release(); //release to pool
    }
}

module.exports = {
    selectDb,
    insertDb
}