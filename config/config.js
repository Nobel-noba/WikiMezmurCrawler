require('dotenv').config();

module.exports = {
    baseUrl: process.env.BASE_URL,

    request: {
        timeout: Number(process.env.REQUEST_TIMEOUT),
        delay: Number(process.env.REQUEST_DELAY)
    },

    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
};