const { User, username, email, password, phone_number, address } = require('../models/userModel');              // Import createUser function
const bcrypt = require('bcrypt');
const fastify = require('fastify') ();                              // Creating new Fastify instance

async function registerUser(request, reply) {
    const { username, email, password, phone_number, address } = request.body ;


if( !username || !email || !password ) {                                                        // Validate input
    return reply.status(400).send({ message : 'Username, Email and Password are required'})
}

const hashedPassword = await bcrypt.hash(password, 10);                     // Hash password before saving

const newUser = new User({                                                  // Create new User instance
    username,
    email,
    password: hashedPassword,
    phone_number,
    address
});

try{
    await newUser.save();                                                           // Save new user in database
    reply.status(201).send({ message: 'User Registered Successfully!'});
} catch(error){
    reply.status(500).send({ message: 'Error registering user', error});
}

}

module.exports = { registerUser };                                                  // Export function to use in Routes