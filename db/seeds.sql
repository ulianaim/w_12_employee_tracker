INSERT INTO department (name)
VALUES ("Human Resources"),
       ("Development"),
       ("Quality Assurance"),
       ("Support"),
       ("Sales"),
       ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 80000, 2),
       ("Assistant Manager", 65000, 2),
       ("Sales representative", 60000, 5),
       ("Human Resources representative", 50000, 1),
       ("Developer", 90000, 2),
       ("Seniour developer", 120000, 2),
       ("QA Analyst", 80000, 3),
       ("Accountant", 65000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Snow", 1, 1),
       ("Mary", "Kay", 2, 2),
       ("Richard", "Smith", 3, 3),
       ("Alec", "Martin", 4, 4),
       ("Sebastian", "Conzales", 5, 5),
       ("Anna", "Ramirez", 6, 1),
       ("Lisa", "Jones", 7, 2),
       ("Angela", "Piza", 8, 3);
