const cartService = require('../services/cartService');
const authMiddleware = require('../middlewares/authMiddleware');

async function cartRoutes(fastify, options) {
    // Applied  JWT auth middleware for all cart routes
    fastify.addHook('preHandler', authMiddleware);

    fastify.post('/cart', async (request, reply) => {
        try {
            const { bookId, quantity } = request.body;
            const username = request.user.username;

            const result = await cartService.addBookToCart(bookId, quantity, username);

            if (result.error) {
                return reply.code(400).send({ message: result.message });
            }

            reply.code(201).send(result);
        } catch (error) {
            reply.code(500).send({ error: error.message });
        }
    });

    fastify.get('/cart', async (request, reply) => {
        try {
            const username = request.user.username;
            const cartItems = await cartService.getCartItems(username);
            reply.send(cartItems);
        } catch (error) {
            reply.code(500).send({ error: error.message });
        }
    });

    fastify.put('/cart', async (request, reply) => {
        try {
            const { bookId, quantity } = request.body;
            const result = await cartService.updateCartItem(bookId, quantity);
            reply.send(result);
        } catch (error) {
            reply.code(500).send({ error: error.message });
        }
    });

    fastify.delete('/cart', async (request, reply) => {
        try {
            const { bookId } = request.body;

            if (!bookId) {
                return reply.code(400).send({ message: "'bookId' must be provided to delete a cart item." });
            }

            const result = await cartService.removeCartItem(bookId);
            reply.send(result);
        } catch (error) {
            reply.code(500).send({ error: error.message });
        }
    });
}

module.exports = cartRoutes;
