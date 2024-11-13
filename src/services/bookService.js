const db = require('../config/db');

async function addBook(bookData) {

    const { title, author, genre, price, stock, description, published_date } = bookData;

    const query = `INSERT INTO books ( title, author, genre, price, stock, description, published_date ) VALUES ( ?, ?, ?, ?, ?, ?, ? )`;

    const [result] = await db.query ( query, [title, author, genre, price, stock, description, published_date]);

    return result.insertId;

}

async function getBookById(id) {

    const [rows] = await db.query( 'SELECT * FROM books WHERE id = ?', [id]);

    return rows[0];

}

async function updateBook(id, bookData) { 

    const { title, author, genre, price, stock, description, published_date } = bookData;

    const query = `UPDATE books SET title = ?, author = ?, price =?, stock = ?, description = ?, published_date = ? WHERE id = ?`;

    await db.query(query, [title, author, genre, price, stock, description, published_date, id]);

}

async function deleteBook(id) {

    const parsedId = parseInt(Id, 10);
    if (isNAN(parseId)) {
        throw new Error('Invalid ID')
    }

    console.log(`Deleting book with ID : ${id}`)

    await db.query('DELETE FROM books WHERE id = ?', [id]);

    console.log('Executing query :',query, 'with id:', parsedId);

}

async function getAllBooks() {

    const [rows] = await db.query('SELECT * FROM books');

    return rows;

}

module.exports = {

    addBook,
    getBookById,
    updateBook,
    deleteBook,
    getAllBooks

}