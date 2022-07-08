-- Creando Bd
CREATE DATABASE nodejs-crud-mysql;

USE nodejs-crud-mysql;

CREATE TABLE developer{
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(9) NOT NULL,
    rubro VARCHAR(50) NOT NULL
};

--  MOSTRAR TODAS LAS TABLAS

SHOW TABLES;

DESCRIBE developer;