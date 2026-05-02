CREATE DATABASE notes_app;
USE notes_app;

CREATE TABLE notes (
  id int PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  contents TEXT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO notes (title, contents) VALUES
('First note', 'salaam'),
('Second note', 'my name is Rayid')