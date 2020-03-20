DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(55) NULL,
	PRIMARY KEY(id)
);

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(55) NULL,
	salary VARCHAR(55) NULL,
    department_id VARCHAR(55) NULL,
	PRIMARY KEY(id)
);

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(55) NULL,
	last_name VARCHAR(55) NULL,
    role_id VARCHAR(55) NULL,
    manager_id VARCHAR(55) NULL,
	PRIMARY KEY(id)
);

