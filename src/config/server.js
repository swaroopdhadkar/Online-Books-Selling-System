const fastifyCors = require('@fastify/cors');                                                           // Import the new @fastify/cors package
const fastifyFormbody = require('@fastify/formbody');                                                   // Import the fastify formbody plugin (for parsing request bodies)
const db = require('../config/db');                                                                      // Database connection
const userRoutes = require('../routes/register');
const loginRoutes = require('../routes/login')

async function registerMiddleware(fastify){                                                              // Function to set up Middleware
    fastify.register(fastifyCors, {
        origin:true
    });

    // Registerbody parser middleware for handling request body data
    fastify.register(fastifyFormbody);
}

async function connectToDatabase(fastify) {                                                                   // function to connect to the Database

    try {
        
        const connection = await db.getConnection();                                                         // Get a connection from the pool
        await db.query('SELECT 1');                                                                          // Test the database connection using a query
        console.log('Database Connection Successful!');
        connection.release();                                                                                // Release the Connection back to the pool

    } catch (error) {
        console.error('Error connecting to the Database:', error);
        throw error;
    }
        
}

async function registerRoutes(fastify) {                                                                      // Function to set up all routes     // Register Routes
    fastify.register(userRoutes);
    fastify.register(loginRoutes);                                                                             // Register the User Registration Route
}

// Export the functions to be used in index.js
module.exports = {
    registerMiddleware,
    connectToDatabase,
    registerRoutes,
};