const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',        // default MySQL user in XAMPP
    password: '',        // default password is empty for root in XAMPP
    database: 'venuevista'
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
    connection.release();
});

pool.query('SELECT * FROM venues', (err, results) => {
    if (err) {
        console.error('Error fetching data:', err);
        return;
    }
    console.log(results);
});
