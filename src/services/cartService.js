const db = require('../config/db');

async function addBookToCart(bookId, quantity, username) {
    const [bookExists] = await db.query('SELECT * FROM books WHERE bookId = ?', [bookId]);
    if (bookExists.length === 0) {
        return { error: true, message: `Book with bookId ${bookId} does not exist.` };
    }

    const [userResult] = await db.query('SELECT userId FROM users WHERE username = ?', [username]);
    if (userResult.length === 0) {
        return { error: true, message: `User with username ${username} does not exist.` };
    }

    const userId = userResult[0].userId;
    const [result] = await db.execute(
        'INSERT INTO carts (bookId, quantity, userId) VALUES (?, ?, ?)', 
        [bookId, quantity, userId]
    );

    return { error: false, message: 'Book added to cart successfully.', cartItemId: result.insertId };
}

async function getCartItems(username) {
    const [userResult] = await db.query('SELECT userId FROM users WHERE username = ?', [username]);
    if (userResult.length === 0) {
        return { error: true, message: `User with username ${username} does not exist.` };
    }

    const userId = userResult[0].userId;
    const [carts] = await db.query('SELECT * FROM carts WHERE userId = ?', [userId]);
    return {
        message: 'Cart items retrieved successfully.',
        cartItems: carts
    };
}

async function updateCartItem(bookId, quantity) {
    const [result] = await db.execute(
        'UPDATE carts SET quantity = ? WHERE bookId = ?',
        [quantity, bookId]
    );

    if (result.affectedRows === 0) {
        return { message: 'No cart item found to update.' };     
    }

    return {
        message: 'Cart item quantity updated successfully.',
        affectedRows: result.affectedRows
    };
}

async function removeCartItem(bookId) {
    const [result] = await db.execute(
        'DELETE FROM carts WHERE bookId = ?',
        [bookId]
    );

    if (result.affectedRows === 0) {
        return { message: `No cart item found with bookId: ${bookId}.` };
    }

    return {
        message: 'Cart item deleted successfully.',
        affectedRows: result.affectedRows
    };
}

module.exports = {
    addBookToCart,
    getCartItems,
    updateCartItem,
    removeCartItem
};

