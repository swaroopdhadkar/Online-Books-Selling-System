const mysql = require('mysql2/promise'); 
const dotenv = require('dotenv');
dotenv.config();                            // This loads the variables from .env into process.env

require('dotenv').config({ path: '../.env' }); // Assuming .env is at the root level

const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
});

module.exports=pool;                        // Export the pool for use in other modules