# Bamazon-Node-and-MySql-
* ## Description

  * CLI App assignment Using Node and MySQL. This is basically a mock Amazon product manager used to keep track of any sales, profits and stock of items sold on the database.
  * Created By Troy Garcia

* ## Database Schema
  * ### [Products Table Schema with seeds:](https://gyazo.com/a9130d89c63472c42f8d4a2afe3479ee)
    ![](https://i.gyazo.com/a9130d89c63472c42f8d4a2afe3479ee.png)
    ``` 
    CREATE TABLE products (
        item_id INT NOT NULL AUTO_INCREMENT,
        product_name VARCHAR(50) NOT NULL,
        department_name VARCHAR(50) NULL,
        price DECIMAL(10,2) NULL,
        stock_quantity INT NULL,
        PRIMARY KEY (item_id)
    );
    ```

  * ### [Departments Table Schema with seeds:](https://gyazo.com/9a093d24b117a1c3baa01ac51dc35142)
    ![](https://i.gyazo.com/a9130d89c63472c42f8d4a2afe3479ee.png)
    ```
    CREATE TABLE departments (
        department_id INT NOT NULL AUTO_INCREMENT,
        department_name VARCHAR(50) NULL,
        over_head_costs DECIMAL(10,2) NULL,
        product_sales DECIMAL(10,2) NULL,
        PRIMARY KEY (department_id)
    );
    ```


