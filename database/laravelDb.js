const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({

    host: process.env.LARAVEL_DB_HOST,

    port: process.env.LARAVEL_DB_PORT,

    user: process.env.LARAVEL_DB_USER,

    password: process.env.LARAVEL_DB_PASSWORD,

    database: process.env.LARAVEL_DB_NAME,

    waitForConnections: true,

    connectionLimit: 10

});

module.exports = pool;