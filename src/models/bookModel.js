class Book {
    constructor(id, title, author, genre, price, stock, description, published_date) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.price = price;
        this.stock= stock;
        this.description = description;
        this.published_date = published_date;
    }
}

module.exports = Book;