DROP TABLE IF EXISTS objects
CASCADE;
DROP TABLE IF EXISTS images
CASCADE;
DROP TABLE IF EXISTS categories
CASCADE;
DROP TABLE IF EXISTS locations
CASCADE;
DROP TABLE IF EXISTS origins
CASCADE;
DROP TABLE IF EXISTS manufacturers
CASCADE;
DROP TABLE IF EXISTS objects_categories
CASCADE;


CREATE TABLE images
(
  id serial PRIMARY KEY,
  image_one text,
  image_two text,
  image_three text,
  image_four text
);
ALTER SEQUENCE images_id_seq RESTART WITH 1000;

CREATE TABLE categories
(
  id serial PRIMARY KEY,
  name text NOT NULL
);

ALTER SEQUENCE categories_id_seq RESTART WITH 10;



CREATE TABLE locations
(
  id serial PRIMARY KEY,
  postal_code text NOT NULL,
  coordinates text,
  city text,
  state text
);
ALTER SEQUENCE locations_id_seq RESTART WITH 10000;


CREATE TABLE origins
(
  id serial PRIMARY KEY,
  country text NOT NULL,
  capital text,
  global boolean
);
ALTER SEQUENCE origins_id_seq RESTART WITH 100;


CREATE TABLE manufacturers
(
  id serial PRIMARY 
  KEY,
  corp text NOT NULL
);

ALTER SEQUENCE manufacturers_id_seq RESTART WITH 600;

CREATE TABLE objects
(
  id serial PRIMARY KEY,
  name text NOT NULL,
  description text,
  created timestamp DEFAULT now(),
  image_id int REFERENCES images(id) ON DELETE CASCADE,
  location_id int REFERENCES locations(id) ON DELETE SET NULL,
  origin_id int REFERENCES origins(id) ON DELETE SET NULL,
  manufacturer_id int REFERENCES manufacturers(id) ON DELETE SET NULL
);

ALTER SEQUENCE objects_id_seq RESTART WITH 100000;

CREATE TABLE objects_categories
(
  object_id INTEGER NOT NULL REFERENCES objects ON DELETE CASCADE,
  category_id INTEGER NOT NULL REFERENCES categories ON DELETE CASCADE
);
INSERT INTO images
  ( image_one, image_two )
VALUES
  ('https://res.cloudinary.com/dgzjr8afn/image/upload/v1549995330/fj60xhnjhaaaqkssid7j.jpg',
    'example.com/2'),
  ('https://res.cloudinary.com/dgzjr8afn/image/upload/v1549995313/bbpzpecg0dizqtqt7cqy.jpg',
    'example.com/4'),
  ('https://res.cloudinary.com/dgzjr8afn/image/upload/v1549995304/esbu8rud04xpqtothuqm.jpg',
    'example.com/26'),
  ('https://res.cloudinary.com/dgzjr8afn/image/upload/v1549995337/epckjoi8tze5kgdqc7ql.jpg',
    'example.com/87'),
  ('https://res.cloudinary.com/dgzjr8afn/image/upload/v1549995323/tl1veaeirjlzm4xiyqls.jpg',
    'example.com/89');



INSERT INTO locations
  (postal_code, city, state)
VALUES
  ('19125', 'Philadelphia', 'PA'),
  ('11362', 'New York' , 'NY'),
  ('95521', 'Arcata', 'CA');


INSERT INTO origins
  (country, capital,  global)
VALUES
  ('china', 'Beijing', true),
  ('USA', 'Washington, D. C.', false),
  ('ghana', 'Accra',null ),
    ('Mexico', 'Mexico City', null ),
    ('England','London', false);

INSERT INTO manufacturers
  (corp)
VALUES
  ('Bic'),
  ('Procter & Gamble'),
  ('GreenBrier International'),
  ('Tiger Electronics'),
  ('Affiliated Publishers, Inc.'),
  ('Lesney production & company');


INSERT INTO objects
  (name, description, image_id, location_id, origin_id, manufacturer_id)
VALUES

  (
    'Pen',
    'Writes well, its made of 74% recycled plastic, classic Bic round stic',
    1000,
    10000,
    103,
    600
  ),
  (
    'Handheld console',
    'entertainment in the old days of handheld electronics, from the 1990s',
    1001,
    10000,
    100,
    603
  ),
  (
    'book',
    'it has words, written in 1960 republished 
    in 1962m cornerstone library in new york, a how to guide on sailing',
    1002,
    10001,
    101,
    604
  ),
  (
    'umbrella',
    'broken but a nice mass produced and intricate thing both.',
    1003,
    10001,
    100,
    602
  ),
  (
    'Toy dump-truck',
    'Small with articulating parts , 1969 matchbox series,
    series number 51 8 wheel tipper',
    1004,
    10002,
    104,
    605
  );

INSERT INTO categories
  (name)
VALUES
  ('plastic'),
  ('toy'),
  ('tool'),
  ('clothing'),
  ('vintage'),
  ('electronic'),
  ('book');

INSERT INTO objects_categories
  (object_id, category_id)
VALUES
  ( 100000, 11),
  ( 100000, 12),
  ( 100000, 13),
  ( 100001, 11),
  ( 100001, 12),
  ( 100002, 10),
  ( 100003, 14),
  ( 100003, 10),
  ( 100004, 15),
  ( 100004, 16),
  ( 100004, 10);
