const db = require('../config/db');
const bcrypt = require('bcrypt');

const verifyAdmin = async (request, reply) => {
  const { email, passwords } = request.body;

  if (!email || !passwords) {
    return reply.status(400).send({ error: 'Email and password are required' });
  }

  try {
    // Query the database to retrieve the admin's data by email
    const [admin] = await db.query('SELECT * FROM Admins WHERE email = ?', [email]);


    // Check if an admin record with this email was found
    if (!admin || admin.length === 0) {
      console.log("No admin found with the provided email.");
      return reply.status(403).send({ error: 'Invalid admin credentials' });
    }

    // Retrieve the hashed password from the result
    const storedHashedPassword = admin[0].passwords;


    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(passwords, storedHashedPassword);
    console.log("Password match result:", passwordMatch);

    if (!passwordMatch) {
      console.log("Password does not match.");
      return reply.status(403).send({ error: 'Invalid admin credentials' });
    }

    // Successful admin verification
    request.user = { isAdmin: true, email };
    console.log("Admin verified successfully.");
  } catch (error) {
    console.error("Error in admin verification:", error);
    return reply.status(500).send({ error: 'Server error', details: error.message });
  }
};

module.exports = { verifyAdmin };
