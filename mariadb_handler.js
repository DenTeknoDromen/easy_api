const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: process.env.DB_URL, 
     user: process.env.MARIADB_USER, 
     password: process.env.MARIADB_PASSWORD,
     connectionLimit: 5
});

async function selectDb(input) {
    const query = `SELECT * FROM cities WHERE id=${input}`
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(query);
        return rows
        //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    } finally {
        if (conn) conn.release(); //release to pool
    }
}

module.exports = {
    selectDb
}