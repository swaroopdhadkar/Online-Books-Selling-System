const { pool } = require('../config/db');  

// Fetch all books from the database
async function getAllBooks() {
  const [rows] = await pool.query('SELECT * FROM books');
  return rows;
}

// Search books by title or author
async function searchBooks(title, author) {
  let query = 'SELECT title, author, price FROM books WHERE 1=1';
  const queryParams = [];

  
  if (title) {
    query += ' AND title LIKE ?';
    queryParams.push(`%${title}%`); 
  }
  if (author) {
    query += ' AND author LIKE ?';
    queryParams.push(`%${author}%`);
  }

  const [rows] = await pool.query(query, queryParams);
  return rows;
}

// Filter books by price range
async function filterBooksByPrice(minPrice, maxPrice) {
  const [rows] = await pool.query('SELECT * FROM books WHERE price BETWEEN ? AND ?', [minPrice, maxPrice]);
  return rows;
}

// Add a new book to the database
async function addBook(title, author, price) {
  const [result] = await pool.query('INSERT INTO books (title, author, price) VALUES (?, ?, ?)', [title, author, price]);
  return result.insertId;  // Returns the ID of the newly inserted book
}

// Update a book's details
async function updateBook(bookId, title, author, price) {
  const [result] = await pool.query('UPDATE books SET title = ?, author = ?, price = ? WHERE id = ?', [title, author, price, bookId]);
  return result.affectedRows;  // Returns the number of affected rows
}

// Delete a book by ID
async function deleteBook(bookId) {
  const [result] = await pool.query('DELETE FROM books WHERE id = ?', [bookId]);
  return result.affectedRows;  // Returns the number of affected rows
}

module.exports = {
  getAllBooks,
  searchBooks,
  filterBooksByPrice,
  addBook,
  updateBook,
  deleteBook,
};
