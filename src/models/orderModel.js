class Order {
    constructor({ orderId, userId, total_price, shipping_address, payment_method, cartId }) {
        this.orderId = orderId;
        this.userId = userId;
        this.total_price = total_price;
        this.shipping_address = shipping_address;
        this.payment_method = payment_method;
        this.cartId = cartId;
    }
}

module.exports = Order;
