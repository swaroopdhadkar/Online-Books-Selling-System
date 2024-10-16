const fastify = require('fastify') ({ logger : true});
const { registerMiddleware, connectToDatabase, registerRoutes } = require('./config/server')

fastify.get ('/', async(request,reply) => {
    return { message : 'Welcome to the Online Books Selling System'}
})
// Response for GET method , GET endpoint for the root path

// Register Middleware
registerMiddleware(fastify);

// Connect to the Database
connectToDatabase(fastify);

// Register Routes
registerRoutes(fastify);

const start = async () => {
    try {
        await fastify.listen({ port : 3000 });                                             // Listen on PORT 3000
        console.log('Server is running at http://localhost:3000');             // Log the server URL
    } catch(err) {                                                               // Catch any error during server startup and log them
        fastify.log.error(err);                                                  // Log any errors that may occur
        process.exit(1);                                                         // Exit the process with a failure code
    }

};

start();                                        // Invoke the start function

