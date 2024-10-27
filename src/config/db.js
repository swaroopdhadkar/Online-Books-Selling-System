const mysql = require('mysql2/promise'); 
// const mysql = require('mysql2/promise');

const dotenv = require('dotenv');
dotenv.config();                            // This loads the variables from .env into process.env
require('dotenv').config({ path: '../../.env' });
require('dotenv').config({ path: '../.env' }); // Assuming .env is at the root level
require('dotenv').config({ path: '..src/.env' });


dotenv.config();                            // Load environment variables from .env files

const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,   
});



pool.getConnection()
  .then(connection => {
    console.log("Database connected successfully");
    connection.release();
  })
  .catch(err => {
    console.error("Database connection failed:", err.message);
});

module.exports=pool;                        // Export the pool for use in other modules




