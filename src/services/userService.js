const db = require('../config/db')
const bcrypt = require('bcrypt');

async function createUser(user) { 
    const { username, email, password, phone_number, address, role } = user;

    // Check if the role is provided, if not then the default role is 'Customer'
    const userRole = role ? role : 'Customer';

    const query = 'INSERT INTO users ( username, email, password, phone_number, address, role) VALUES ( ?, ?, ?, ?, ?, ? )';
    const values = [ username, email, password, phone_number, address, userRole];

    try {
        const [result] = await db.query(query, values);
        return { id:result.insertId, username, email, phone_number, address, role: userRole};
    } catch (error) {
        throw error;
    }

}

module.exports = { createUser };