CREATE DATABASE database_service;

USE database_service;
--clientes TABLE
CREATE TABLE clientes(
  id INT(11) NOT NULL,
  usuario VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  nombre VARCHAR(60) NOT NULL,
  apellido VARCHAR(60) NOT NULL,
  telefono1 INT(11) NOT NULL,
  email VARCHAR(60) NOT NULL
);
ALTER TABLE clientes
  ADD PRIMARY KEY (id);

ALTER TABLE clientes
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE clientes;

-- equipos TABLE
CREATE TABLE equipos (
  id INT(11) NOT NULL,
  tipo VARCHAR(150) NOT NULL,
  marca VARCHAR(150) NOT NULL,
  modelo VARCHAR(150) NOT NULL,
  comentarios TEXT,
  estado VARCHAR(10) NOT NULL,
  cotizacion INT(11) NOT NULL,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_cliente FOREIGN KEY (user_id) REFERENCES clientes(id)
);
ALTER TABLE equipos
  ADD PRIMARY KEY(id);

ALTER TABLE equipos
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

DESCRIBE equipos;

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