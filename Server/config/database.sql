CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL UNIQUE,
    email VARCHAR(28) NOT NULL UNIQUE,
    passhash VARCHAR NOT NULL,
    points INT NOT NULL,
    dateOfBirth TIMESTAMP NOT NULL,
    createDate TIMESTAMP NOT NULL
);

CREATE TABLE tests(
    user_id SERIAL PRIMARY KEY,
    time TIMESTAMP NOT NULL,
    score INT NOT NULL,
    wrong_words VARCHAR,
	correct_words VARCHAR
);

CREATE TABLE words(
	id SERIAL PRIMARY KEY,
	engWords VARCHAR,
	hunWords VARCHAR
);