const { createUser } = require('../models/userModel');              // Import createUser function
const bcrypt = require('bcryptjs');
const fastify = require('fastify') ();                              // Creating new Fastify instance

// User Registration Route
fastify.post('/register', async (request, reply) => {
    const { username, email, password, phone_number, address } = request.body;              // Get user data from request body

// Hash the password for security
const hasedPassword = await.bcrypt.hash(password, 10);

// Call creteUSer to insert User Data into the Database
createUser({ username, email, password: hasedPassword, phone_number, address, role: 'Customer' }, (err, result) => {
    if (err) {
        reply.status(500).send({ message: 'Error creating User' });                                      // Sending Error response
    } else {
        reply.status(201).send({ message: 'USer Registered successfully', userId: result.insertId });    // Send success response including new userId
    }
    
});
});

module.exports= fastify;