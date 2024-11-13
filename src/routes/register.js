const User  = require('../models/userModel');                            // Import User Model
const userService = require('../services/userService');
const bcrypt = require('bcrypt');

async function registerUserRoutes(fastify, options) {
    fastify.post('/register', async (request, reply) => {
        const { username, email, password, phone_number, address, role } = request.body ;
    

        if (!username || !email || !password || !phone_number ||!address) {                                                        // Validate input

        return reply.status(400).send({ message : 'Username, Email and Password are required'})

        }

        const hashedPassword = await bcrypt.hash(password, 10);                     // Hash password before saving

        const newUser = new User({                                                  // Create new User instance
            username,
            email,
            password: hashedPassword,
            phone_number,
            address,
            role
    });

        try{
            
            // Use the service to save the User to the Database
            const result= await userService.createUser(newUser);

            // Success response
            reply.status(201).send({ message: 'Registered Successfully!'});

        } catch(error){

            console.error("Error details:", error);
            reply.status(500).send({ message: 'Error registering user', error: error.message || error});

        }
    });
}

module.exports = registerUserRoutes;                                                  // Export function to use in Routes