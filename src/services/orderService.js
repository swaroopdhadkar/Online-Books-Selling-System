const db = require('../config/db');

async function createOrder(userId, total_price, shipping_address, payment_method, cartId) {
    try {

        const query = `INSERT INTO Orders (userId, total_price, shipping_address, payment_method, cartId) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await db.execute(query, [userId, total_price, shipping_address, payment_method, cartId]);

        return {
            message: 'Order created successfully.',
            orderId: result.insertId
        };
    } catch (error) {
        return { error: true, message: error.message };
    }
}



async function getOrders(userId) {
    try {
        // Retrieve user by userId
        const [userResult] = await db.query('SELECT userId FROM users WHERE userId = ?', [userId]);
        
        if (userResult.length === 0) {
            return { error: true, message: `User with userId ${userId} does not exist.` };
        }

        // Fetch orders based on the provided userId
        const [orders] = await db.query('SELECT * FROM orders WHERE userId = ?', [userId]);
        
        return {
            message: 'Orders retrieved successfully.',
            orders: orders
        };
    } catch (error) {
        return { error: true, message: error.message };
    }
}


async function updateOrder(orderId, shipping_address, payment_method, cartId) {
    try {
        const [result] = await db.execute(
            'UPDATE orders SET shipping_address = ?, payment_method = ?, cartId = ? WHERE orderId = ?',
            [shipping_address, payment_method, cartId, orderId]
        );

        if (result.affectedRows === 0) {
            return { error: true, message: 'No order found to update.' };
        }

        return {
            message: 'Order updated successfully.'
        };
    } catch (error) {
        return { error: true, message: error.message };
    }
}

async function deleteOrder(orderId) {
    try {
        const [result] = await db.execute(
            'DELETE FROM orders WHERE orderId = ?',
            [orderId]
        );

        if (result.affectedRows === 0) {
            return { error: true, message: `No order found with orderId: ${orderId}.` };
        }

        return {
            message: 'Order deleted successfully.'
        };
    } catch (error) {
        return { error: true, message: error.message };
    }
}

module.exports = {
    createOrder,
    getOrders,
    updateOrder,
    deleteOrder
};
