const mysql = require('mysql2/promise'); 
const dotenv = require('dotenv');
dotenv.config();                            // This loads the variables from .env into process.env

dotenv.config();                            // Load environment variables from .env files

const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
});

module.exports=pool;                        // Export the pool for use in other modules