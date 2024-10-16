const fastifyCors = require('fastify-cors');
const db = require('./db');                                 // Database connection
const userRoutes = require('../routes/register');

async function registerMiddleware(fastify){
    fastify.register(fastifyCors, {
        origin:true
    });
}

function connectToDatabase(fastify) {
    db.connect((err) => { 
        if (err) {
            fastify.log.error(err)                              // Log error
            process.exit(1);                                    // Exit the application on error
        }
        fastify.log.info('Database Connected successfully');
    });
}

async function registerRoutes(fastify) {                                // Register Routes
    fastify.register(userRoutes);                                       // User registration route

}

// Export the functions to be used in index.js
module.exports = {
    registerMiddleware,
    connectToDatabase,
    registerRoutes,
};