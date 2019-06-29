CREATE DATABASE database_service;

USE database_service;
--users TABLE
CREATE TABLE users(
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  name VARCHAR(60) NOT NULL,
  lastname VARCHAR(60) NOT NULL,
  phone INT(11) NOT NULL,
  email VARCHAR(60) NOT NULL,
  user_type VARCHAR(16),
  status CHAR(1)
);
ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

-- equipment TABLE
CREATE TABLE equipment (
  id INT(11) NOT NULL,
  type VARCHAR(150) NOT NULL,
  brand VARCHAR(150) NOT NULL,
  model VARCHAR(150) NOT NULL,
  comments TEXT,
  state VARCHAR(10) NOT NULL,
  quotation INT(11) NOT NULL,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_cliente FOREIGN KEY (user_id) REFERENCES users(id)
);
ALTER TABLE equipment
  ADD PRIMARY KEY(id);

ALTER TABLE equipment
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

DESCRIBE equipment;

-- encargados TABLE

CREATE TABLE encargados(
  id INT(11) NOT NULL,
  usuario VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  nombre VARCHAR(60) NOT NULL,
  apellido VARCHAR(60) NOT NULL,
  telefono1 INT(11) NOT NULL,
  email VARCHAR(60) NOT NULL
);
ALTER TABLE encargados
  ADD PRIMARY KEY (id);

ALTER TABLE encargados
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE encargados;