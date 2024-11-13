const orderService = require('../services/orderService');
const db = require('../config/db');

async function orderRoutes(fastify, options) {

    fastify.post('/order', async (request, reply) => {
        try {
            const { userId, total_price, shipping_address, payment_method, cartId } = request.body;
      
            const result = await orderService.createOrder(userId, total_price, shipping_address, payment_method, cartId);

            if (result.error) {
                return reply.code(400).send({ message: result.message });
            }

            reply.code(201).send({ message: result.message, orderId: result.orderId });
        } catch (error) {
            reply.code(500).send({ error: true, message: error.message });
        }
    });


    fastify.get('/orders', async (request, reply) => {
        try {
            const { userId } = request.query; 
            const orders = await orderService.getOrders(userId);
            reply.send(orders);
        } catch (error) {
            reply.code(500).send({ error: error.message });
        }
    });
    


    // Route to update an order
    fastify.put('/orders', async (request, reply) => {
        try {
            const { orderId, shipping_address, payment_method, cartId } = request.body;
            const result = await orderService.updateOrder(orderId, shipping_address, payment_method, cartId);

            if (result.error) {
                return reply.code(400).send({ message: result.message });
            }

            reply.send(result); // Send the updated order details if successful
        } catch (error) {
            reply.code(500).send({ error: error.message });
        }
    });

    // Route to delete an order
    fastify.delete('/orders', async (request, reply) => {
        try {
            const { orderId } = request.body;
            const result = await orderService.deleteOrder(orderId);

            if (result.error) {
                return reply.code(400).send({ message: result.message });
            }

            reply.send(result); // Send confirmation of deletion if successful
        } catch (error) {
            reply.code(500).send({ error: error.message });
        }
    });
}

module.exports = orderRoutes;
