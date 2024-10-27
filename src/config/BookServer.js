const mysql = require('mysql2/promise');


require('dotenv').config();


const fastify = require('fastify')({ logger: true });
const { pool } = require('../config/db');  
// const db = require('../config/db');
const { verifyAdmin } = require('../middlewares/adminMiddlewares');  


fastify.decorate('verifyAdmin', verifyAdmin);

// Added a simple GET route to check if the project is running
fastify.get('/', async (request, reply) => {
  return reply.status(200).send({ message: 'Online Book Selling Project is running' });
});


fastify.register(require('../routes/booksRoutes'));  

// Start the Fastify server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

module.exports = fastify;






