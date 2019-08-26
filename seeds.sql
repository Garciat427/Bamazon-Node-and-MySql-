-- Product Seeds
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pencil", "Supplies", 1.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Staples", "Supplies", 3.50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vanilla Crackers", "Food", 2.25, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Animal Crackers", "Food", 1.25, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("White TShirt", "Clothing", 5.00, 10);

INSERT INTO products (product_name, department_name, price, stck_quantity)
VALUES ("Black Hoodie", "Clothing", 15.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Drill", "Tools", 150.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hammer", "Tools", 50.00, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Desktop PC", "Electronics", 1000.00, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop PC", "Electronics", 1100.00, 0);

-- Department Seeds
INSERT INTO departments (department_name, over_head_costs, product_sales)
VALUES ("Supplies", 1000, 2000);

INSERT INTO departments (department_name, over_head_costs, product_sales)
VALUES ("Food", 5000, 7500);

INSERT INTO departments (department_name, over_head_costs, C)
VALUES ("Clothing", 5000, 7500);

INSERT INTO departments (department_name, over_head_costs, product_sales)
VALUES ("Tools", 5000, 7500);

INSERT INTO departments (department_name, over_head_costs, product_sales)
VALUES ("Electronics", 5000, 7500);