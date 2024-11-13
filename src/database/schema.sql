CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15),
    address VARCHAR(255),
    role ENUM('Customer', 'Admin') DEFAULT 'Customer'
);

CREATE TABLE books (
    id AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(50),
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    description TEXT,
    published_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Carts (
    cartId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    sessionId VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE SET NULL
);
    
CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT, -- NULL if guest user
    total_price DECIMAL(10, 2) ,
    shipping_address VARCHAR(255) NOT NULL,
    order_status ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
    payment_method ENUM('COD', 'Credit Card', 'Debit Card', 'Net Banking') NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId)
);    
