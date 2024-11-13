const { User } = require ('../models/userModel');
const userService = require('../services/userService')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function loginUserRoutes(fastify, options) {
    fastify.post('/login', async (request, reply) => { 
       
        const { email, password } = request.body;

        // Validate the input
        if (!email || !password) {
            return reply.status(400).send({ message: 'Email and password are required.' });
        }

        try {
            // Retrieve the user based on the email provided by the user
            const user = await userService.getUserByEmail(email);

            if (!user) {
                return reply.status(401).send({ message: 'Invalid email or password.' });
            }


            // Compare the password provided with the hashed password stored in database
            const isMatch = await bcrypt.compare(password, user.password);
        
            if (!isMatch) {
                return reply.status(401).send({ message: 'Invalid email or password' });
            }

            // Generate a JWT Token
            const token = jwt.sign(
                { id: user.id, role: user.role,username: user.username},
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            reply.send({ token });

        } catch (error) {

        console.error("Login error: ", error)
        reply.status(500).send({ message: 'Internal server error' });

        }

    });   
        
}

module.exports = loginUserRoutes;