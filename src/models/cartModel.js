class Cart {
    constructor({ cartItemId, userId, bookId, quantity }) {
        this.cartItemId = cartItemId;
        this.userId = userId;
        this.bookId = bookId;
        this.quantity = quantity;
    }
}

module.exports = Cart;
