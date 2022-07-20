INSERT INTO department (department_name)
VALUES ("Tech Department"),
       ("Human Relations Department"),
       ("Finance Department");

INSERT INTO roles (title, salary, department_id)
VALUES ("Janitor", 12000.0, 1),
       ("Boss", 10000.0, 2),
       ("Hard Worker", 70000.0, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Max", "Shaw", 1, NULL),
       ("Bill", "Billiams", 2, 1),
       ("David", "Davidson", 2, 2);