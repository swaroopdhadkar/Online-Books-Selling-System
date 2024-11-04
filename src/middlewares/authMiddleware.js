const jwt = require('jsonwebtoken');

// Function to verufy JWT Tokens
async function authMiddleware(request, reply) {

    try {

        // Extract the token from Authorization header
        const token = request.headers['authorization']?.split(' ')[1];

        // Logging the incoming token
        console.log("Incoming token:", token);

        if (!token) { 

            return reply.status(401).send({ message: 'Authorization token missing' })
        }

        // Verify the user using the Secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attack decoded data of user to the request object
        request.user = decoded;                                                                     // Allows route handler to access user information
       
        console.log("Authenticated User:", request.user);

    } catch (error) {

        console.error("Token verification error:", error);

        return reply.status(403).send({ message: 'Invalid token'});                                 // If token verification fails                                                     
                                                       
    }

}

module.exports = authMiddleware;