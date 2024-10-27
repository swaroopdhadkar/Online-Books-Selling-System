// bookService.js
const db = require('../config/db');

async function getAllBooks() {
  const [books] = await db.query('SELECT * FROM books');
  return books;
}

async function searchBooks(title, author) {
  const query = 'SELECT * FROM books WHERE title LIKE ? OR author LIKE ?';
  const [books] = await db.query(query, [`%${title}%`, `%${author}%`]);
  return books;
}

async function filterBooksByPrice(minPrice, maxPrice) {
  const query = 'SELECT * FROM books WHERE price BETWEEN ? AND ?';
  const [books] = await db.query(query, [minPrice, maxPrice]);
  return books;
}

module.exports = {
  getAllBooks,
  searchBooks,
  filterBooksByPrice,
};
