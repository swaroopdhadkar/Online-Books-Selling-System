const db = require('../config/db');                         // Import the DB Pool

const createUser = (userData, callback) => {                                                // Funtion to create new User
    const { username, email, password, phone_number, address, role} = userData ;            // User data destucture
    const sql = 'INSERT INTO users ( username, password, phone_number, address, role) VALUES (?, ?, ?, ?, ?, ?) ';              // SQL Query to insert new users

    db.query( sql, [username, email, password, phone_number, address, role], (err, result) => {
        if (err) return callback(err);                                                                 // Return error if it occurs
        return callback(null, result);                                                                 // Return the result is successful
    });


};

module.exports = { createUser };                                                                        // Exporting the createUser Function