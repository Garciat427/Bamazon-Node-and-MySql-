DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pencil", "Supplies", 1.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Staples", "Supplies", 3.50, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vanilla Crackers", "Food", 2.25, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Animal Crackers", "Food", 1.25, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("White TShirt", "Clothing", 5.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Black Hoodie", "Clothing", 15.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Drill", "Tools", 150.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hammer", "Tools", 50.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Desktop PC", "Electronics", 1000.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop PC", "Electronics", 1100.00, 3);

