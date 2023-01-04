-- CREATE DATABASE ratingsandreviews

DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS characteristics CASCADE;
DROP TABLE IF EXISTS reviewcharacteristics CASCADE;

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
  response VARCHAR(1000) DEFAULT NULL,
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

-- Load Photos Table
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

SELECT SETVAL('reviews_review_id_seq', (SELECT MAX(review_id) FROM reviews));
SELECT SETVAL('photos_id_seq', (SELECT MAX(id) FROM photos));
SELECT SETVAL('reviewcharacteristics_id_seq', (SELECT MAX(id) FROM reviewcharacteristics));

CREATE INDEX reviews_product_id_index ON reviews (product_id);
CREATE INDEX photos_review_id_index ON photos (review_id);
-- CREATE INDEX characteristics_characteristic_id_index ON characteristics (characteristic_id);
-- CREATE INDEX revcharacteristics_characteristic_id_index ON reviewcharacteristics (characteristic_id);
-- CREATE INDEX name_index ON characteristics (name);