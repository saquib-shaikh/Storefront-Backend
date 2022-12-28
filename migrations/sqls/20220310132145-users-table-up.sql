/* Replace with your SQL commands */

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR NOT NULL, 
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    password_digest VARCHAR NOT NULL);