CREATE DATABASE animuk;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE animelist (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) ,
    released_date INTEGER ,
    total_episode INTEGER ,
    total_duration INTEGER ,
    category VARCHAR(255)[] ,
    song_type VARCHAR(255) ,
    mal_rank INTEGER ,
    anime_img VARCHAR(255),
    views INTEGER
);

create table productList(
    id INTEGER PRIMARY key,
    name VARCHAR(255),
    img VARCHAR(255),
    type VARCHAR(255),
    material varchar(255),
    color varchar(255),
    size varchar(255),
    price INTEGER
);

INSERT INTO users (fname, lname, phone, email, password)
VALUES ('John', 'Doe', '99110000', 'johndoe@gmail.com', 'neko1007'), 
        ('Sarah', 'Doe', '88110000', 'sarahdoe@gmail.com', 'sara1007');