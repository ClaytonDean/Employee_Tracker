USE employees_db;

INSERT INTO department(name)
VALUES ("Sales");
INSERT INTO department(name)
VALUES ("Engineering");
INSERT INTO department(name)
VALUES ("Finance");
INSERT INTO department(name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 15000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 50000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 35000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 30000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 45000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Napoleon", "Bonaparte", 1, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("William", "Shakespeare", 1, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Thomas", "Jefferson", 2, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Henry", "VIII", 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Julius", "Caesar", 3, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Leonardo", "da Vinci", 4, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Nikola", "Tesla", 3, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Locke", 5, 1)