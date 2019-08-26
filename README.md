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
* ## Program Operation 

  * ### Bamazon Customer (bamazonCustomer.js)
    * Main Menu
  
    ![](https://i.gyazo.com/09612b870ffff7816ae6ab76be7244a2.png)
    * Purchase Menu
  
    ![](https://i.gyazo.com/cbb9f0940e56d3e39a4a9db358f27305.png)
  * ### Bamazon Manager (bamazonCustomer.js)
    * Main Menu
  
    ![](https://i.gyazo.com/807a0d5e1ce0394e4e461ad079a60d95.png)
    * View Products For Sale
  
    ![](https://i.gyazo.com/114fb6f04127ceba8e28f0c7bcc68124.png)
    * View Low Inventory
    
    ![](https://i.gyazo.com/7643746ca8e81a064934db2b6ba23d9d.png)
    * Add Stock to Inventory
    
    ![](https://i.gyazo.com/176d4117f6b4d1897365697fdbb0b828.png)
    * Add Item to Products List
    
    ![](https://i.gyazo.com/2faa0d0429e9a2c2bbf4d29778e5ecad.png)
    
