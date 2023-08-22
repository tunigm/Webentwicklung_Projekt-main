CREATE DATABASE IF NOT EXISTS userinformation;

USE userinformation;

CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL CHECK (username <> '') UNIQUE,
    email VARCHAR(255) NOT NULL CHECK (email <> '') UNIQUE,
    password VARCHAR(255),
    street VARCHAR(255),
    plz INT(5),
    location VARCHAR(255),
    profile_picture VARCHAR(255)
);
