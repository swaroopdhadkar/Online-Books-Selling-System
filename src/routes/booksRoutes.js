// const bookService = require('../services/BookServices');  // Import the book service
// // const db = require('..config/db')

// module.exports = async function (fastify, opts) {
  
//   // Admin login and fetch all books
//   fastify.post('/admin-book-login', { preHandler: fastify.verifyAdmin }, async (request, reply) => {
//     try {
//       const books = await bookService.getAllBooks();
//       if (books.length === 0) {
//         return reply.status(404).send({ error: 'No books found' });
//       }
//       return reply.status(200).send({ message: 'Login successful', books });
//     } catch (error) {
//       fastify.log.error(error);
//     //   return reply.status(500).send({ error: 'Server error' });
//     // Send detailed error information in the response
//     return reply.status(500).send({
//         error: 'Server error',
//         message: error.message || 'An unexpected error occurred',
//         details: error.stack || 'No additional error details available'
//         });
        
//     }
//   });

//   // Search books by title or author
//   fastify.post('/Books/search', { preHandler: fastify.verifyAdmin }, async (request, reply) => {
//     const { title, author } = request.body;
  
//     if (!title && !author) {
//       return reply.status(400).send({ error: 'Title or Author must be provided' });
//     }

//     try {
//       const books = await bookService.searchBooks(title, author);
//       if (books.length === 0) {
//         return reply.status(404).send({ error: 'No books found' });
//       }
//       return reply.send({ books });
//     } catch (error) {
//       fastify.log.error(error);
//       return reply.status(500).send({ error: 'Server error' });
//     }
//   });

//   // Filter books by price
//   fastify.post('/Books/filter-by-price', { preHandler: fastify.verifyAdmin }, async (request, reply) => {
//     const { minPrice, maxPrice } = request.body;
//     if (!minPrice || !maxPrice) {
//       return reply.status(400).send({ error: 'Both minPrice and maxPrice must be provided' });
//     }

//     try {
//       const books = await bookService.filterBooksByPrice(minPrice, maxPrice);
//       if (books.length === 0) {
//         return reply.status(404).send({ error: 'No books found' });
//       }
//       return reply.send({ books });
//     } catch (error) {
//       fastify.log.error(error);
//       return reply.status(500).send({ error: 'Server error' });
//     }
//   });
// };
  
// Import the Fastify instance and database connection
// const db = require('../config/db');

// module.exports = async function (fastify, opts) {
  
//   // Admin login and fetch all books
//   fastify.post('/admin-book-login', { preHandler: fastify.verifyAdmin }, async (request, reply) => {
//     try {
//       const [books] = await db.query('SELECT * FROM books');
//       if (books.length === 0) {
//         return reply.status(404).send({ error: 'No books found' });
//       }
//       return reply.status(200).send({ message: 'Login successful', books });
//     } catch (error) {
//       fastify.log.error(error);
//       return reply.status(500).send({
//         error: 'Server error',
//         message: error.message || 'An unexpected error occurred',
//         details: error.stack || 'No additional error details available'
//       });
//     }
//   });

//   // Search books by title or author
//   fastify.post('/Books/search', { preHandler: fastify.verifyAdmin }, async (request, reply) => {
//     const { title, author } = request.body;
//     if (!title && !author) {
//       return reply.status(400).send({ error: 'Title or Author must be provided' });
//     }

//     try {
//       const query = 'SELECT * FROM books WHERE title LIKE ? OR author LIKE ?';
//       const [books] = await db.query(query, [`%${title}%`, `%${author}%`]);
//       if (books.length === 0) {
//         return reply.status(404).send({ error: 'No books found' });
//       }
//       return reply.send({ books });
//     } catch (error) {
//       fastify.log.error(error);
//       return reply.status(500).send({
//         error: 'Server error',
//         message: error.message || 'An unexpected error occurred',
//         details: error.stack || 'No additional error details available'
//       });
//     }
//   });

//   // Filter books by price
//   fastify.post('/Books/filter-by-price', { preHandler: fastify.verifyAdmin }, async (request, reply) => {
//     const { minPrice, maxPrice } = request.body;
//     if (!minPrice || !maxPrice) {
//       return reply.status(400).send({ error: 'Both minPrice and maxPrice must be provided' });
//     }

//     try {
//       const query = 'SELECT * FROM books WHERE price BETWEEN ? AND ?';
//       const [books] = await db.query(query, [minPrice, maxPrice]);
//       if (books.length === 0) {
//         return reply.status(404).send({ error: 'No books found' });
//       }
//       return reply.send({ books });
//     } catch (error) {
//       fastify.log.error(error);
//       return reply.status(500).send({
//         error: 'Server error',
//         message: error.message || 'An unexpected error occurred',
//         details: error.stack || 'No additional error details available'
//       });
//     }
//   });
// };


// bookRoutes.js
const bookService = require('../services/BookServices');

module.exports = async function (fastify, opts) {
  
  // Admin login and fetch all books
  fastify.post('/admin-book-login', { preHandler: fastify.verifyAdmin }, async (request, reply) => {
    try {
      const books = await bookService.getAllBooks();
      if (books.length === 0) {
        return reply.status(404).send({ error: 'No books found' });
      }
      return reply.status(200).send({ message: 'Login successful', books });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        error: 'Server error',
        message: error.message || 'An unexpected error occurred',
        details: error.stack || 'No additional error details available'
      });
    }
  });

  // Search books by title or author
  fastify.post('/Books/search', { preHandler: fastify.verifyAdmin }, async (request, reply) => {
    const { title, author } = request.body;
    if (!title && !author) {
      return reply.status(400).send({ error: 'Title or Author must be provided' });
    }

    try {
      const books = await bookService.searchBooks(title, author);
      if (books.length === 0) {
        return reply.status(404).send({ error: 'No books found' });
      }
      return reply.send({ books });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        error: 'Server error',
        message: error.message || 'An unexpected error occurred',
        details: error.stack || 'No additional error details available'
      });
    }
  });

  // Filter books by price
  fastify.post('/Books/filter-by-price', { preHandler: fastify.verifyAdmin }, async (request, reply) => {
    const { minPrice, maxPrice } = request.body;
    if (!minPrice || !maxPrice) {
      return reply.status(400).send({ error: 'Both minPrice and maxPrice must be provided' });
    }

    try {
      const books = await bookService.filterBooksByPrice(minPrice, maxPrice);
      if (books.length === 0) {
        return reply.status(404).send({ error: 'No books found' });
      }
      return reply.send({ books });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        error: 'Server error',
        message: error.message || 'An unexpected error occurred',
        details: error.stack || 'No additional error details available'
      });
    }
  });
};



