const authMiddleware = require('../middlewares/authMiddleware');
const userService = require(('../services/userService'));

async function profileRoutes(fastify, options) {

    fastify.get('/profile', { preHandler: authMiddleware}, async (request, reply) => { 

        try {

            // Ensure request.user exists before trying to access it's properties
            if (!request.user) { 

                return reply.status(401).send({ message: 'User not Authenticated' });
            }

            const userId = request.user.id;

            console.log( 'User Id:', userId);
            
            const user = await userService.getUserById(userId);

            if (!user) {

                return reply.status(404).send({ message: 'User not found' });

            }

            reply.send(user);

        } catch (error) {

            console.error('Error in profile route:', error)
            reply.status(500).send({ message: 'Internal server error' });

        }
        
    });


}

module.exports = profileRoutes;