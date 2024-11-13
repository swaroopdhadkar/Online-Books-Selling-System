const bookService = require('../services/bookService');

async function bookRoutes(fastify,options) {

    fastify.post('/books', async(request, reply) => {

        const bookId = await bookService.addBook(request.body);

        reply.status(201).send({ id: bookId, message: 'Book Added Successfully' });

    });

    fastify.get('/books/:id', async (request, reply) => {

        const book = await bookService.getBookById(request.params.id);

        if (!book) return reply.status(404).send({ message: 'Book not found' });

        reply.send(book);

    });

    fastify.put('/books/:id', async (request, reply) => {

        await bookService.updateBook(request.params.id, request.body);

        reply.send({ message: 'Book updated Successsfully' });

    });

    fastify.delete('/books/:id', async (request, reply) => {

        await bookService.deleteBook(request.params.id);

        reply.send({ message: 'Book deleted successfully'});

    });

    fastify.get('/books', async (request, reply) => {

        const books = await bookService.getAllBooks();

        reply.send(books);

    })

}

module.exports = bookRoutes;