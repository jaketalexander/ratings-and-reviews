-- CREATE DATABASE ratingsandreviews

CREATE TABLE IF NOT EXISTS reviews (
  review_id SERIAL PRIMARY KEY,
  product_id INT,
  rating INT,
  summary VARCHAR(100),
  body VARCHAR(500),
  recommend BOOLEAN,
  username VARCHAR(25),
  email VARCHAR(50),
  helpfulness INT
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  review_id INT,
  photo_url TEXT,
  FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);

CREATE TABLE IF NOT EXISTS characteristics (
  characteristic_id SERIAL PRIMARY KEY,
  product_id INT,
  "name" VARCHAR(25)
);

CREATE TABLE IF NOT EXISTS reviewcharacteristics (
  id SERIAL PRIMARY KEY,
  characteristic_id INT,
  review_id INT,
  "value" INT,
  FOREIGN KEY (characteristic_id) REFERENCES characteristics(characteristic_id),
  FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);