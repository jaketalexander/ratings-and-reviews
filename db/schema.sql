-- CREATE DATABASE ratingsandreviews

-- Create Reviews Table
CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  product_id INT,
  rating INT,
  date BIGINT,
  summary VARCHAR(200),
  body VARCHAR(1000),
  recommend BOOLEAN,
  reported BOOLEAN,
  username VARCHAR(50),
  email VARCHAR(200),
  response VARCHAR(1000),
  helpfulness INT
);

-- Load Reviews
COPY reviews
FROM '/Users/jakealexander/Documents/reviewdata/reviews.csv'
DELIMITER ','
CSV HEADER
NULL AS 'null';

-- Create Photos Table
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  review_id INT,
  photo_url TEXT,
  FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);

-- oad Photos Table
COPY photos
FROM '/Users/jakealexander/Documents/reviewdata/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

-- Create Characteristics Table
CREATE TABLE characteristics (
  characteristic_id SERIAL PRIMARY KEY,
  product_id INT,
  name VARCHAR(25)
);

-- Load Characteristics Table
COPY characteristics
FROM '/Users/jakealexander/Documents/reviewdata/characteristics.csv'
DELIMITER ','
CSV HEADER;

-- Creates Review Characteristics Table
CREATE TABLE reviewcharacteristics (
  id SERIAL PRIMARY KEY,
  characteristic_id INT,
  review_id INT,
  value INT,
  FOREIGN KEY (characteristic_id) REFERENCES characteristics(characteristic_id),
  FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);

-- Load Review Characteristics Table
COPY reviewcharacteristics
FROM '/Users/jakealexander/Documents/reviewdata/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;