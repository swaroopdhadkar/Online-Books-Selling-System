class User{
    constructor({ username, email, password, phone_number, address, role = 'user'}){
        this.username = username;
        this.email = email;
        this.password = password;
        this.phone_number = phone_number;
        this.address = address;
        this.role = role;
        // Default value of role is 'user', if not provided.
    }
}

module.exports = User;