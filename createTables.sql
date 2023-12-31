CREATE DATABASE animuk;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
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

create table animeList2(
    id SERIAL PRIMARY KEY,
    name varchar(255),
    released_date INTEGER,
    total_episode INTEGER,
    total_duration INTEGER,
    category varchar(255)[],
    song_type varchar(50),
    mal_rank INTEGER,
    anime_img varchar(255),
    views integer,
    comments varchar(255)[]
);

INSERT INTO users (fname, lname, phone, email, password)
VALUES ('John', 'Doe', '99110000', 'johndoe@gmail.com', 'neko1007'), 
       ('Sarah', 'Doe', '88110000', 'sarahdoe@gmail.com', 'sara1007');

alter table animelist 
add comments varchar(255)[];
	
select * from animelist;

update animeList
set comments = comments || ARRAY['gl bros']
where id = 2;

ALTER TABLE animelist
DROP COLUMN comments;