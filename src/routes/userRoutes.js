const { createUser } = require('../models/userModel');              // Import createUser function
const bcrypt = require('bcryptjs');
const fastify = require('fastify') ();                              // Creating new Fastify instance

// User Registration Route
fastify.post('/register', async (request, reply) => {
    const { username, email, password, phone_number, address } = request.body;              // Get user data from request body











    
});