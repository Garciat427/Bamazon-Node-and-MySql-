//Require Statements
var mysql = require("mysql");
var inquirer = require("inquirer");

//SQL Server Code
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Samsungs1212",
  database: "bamazon"
});
//SQL Server Connect
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  mainMenu();
});

//Functions

function contFunction(){
    inquirer
        .prompt([
            {
            name: "confirm",
            message: "Continue?",
            type: "list",
            choices: ["Continue"]
            }
        ])
        .then(function(answer) {
            mainMenu();
        });
}

//Reads all products then either continues or proceeds to stock items
function readAllProducts(cont) {
    console.log("\n=================== PRODUCT CATALOUGE ====================");
    console.log("==========================================================");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        var products = res;
        for (var i = 0; i < products.length; i++){
            console.log("||  Item ID: " + products[i].item_id + "  ||  Item Name: " + products[i].product_name + "\n\tDepartment Name: " + products[i].department_name + "\n\tItem Price: $" + products[i].price + "\tItem Stock: " + products[i].stock_quantity);
            console.log ("----------------------------------------------------------");
        };
        if (cont)
            contFunction();
        else
            stockItem(products);
    });
    
}

//Reads all products with stock under 5 
function readLowProducts() {
    console.log("\n=================== PRODUCT LOW STOCK CATALOUGE ====================");
    console.log("==========================================================");
    connection.query("SELECT * FROM products WHERE stock_quantity BETWEEN ? AND ?", [0 ,5], function(err, res) {
        if (err) throw err;
        var products = res;
        for (var i = 0; i < products.length; i++){
            console.log("||  Item ID: " + products[i].item_id + "  ||  Item Name: " + products[i].product_name + "\n\tDepartment Name: " + products[i].department_name + "\n\tItem Price: $" + products[i].price + "\tItem Stock: " + products[i].stock_quantity);
            console.log ("----------------------------------------------------------");
        };
        contFunction();
    });
}

//Restocks any item
function stockItem(products) {
    inquirer
    .prompt([
        {
            name: "selection",
            message: "Enter Item ID of the item you wish to stock",
            type: "number",
        }
    ])
    .then(function(answer) {
        var selItem = products[(answer.selection - 1)];
        inquirer
        .prompt([
            {
                name: "quantity",
                message: "How many \"" + selItem.product_name + "\" would you like to stock?",
                type: "number",
            }
        ])
        .then(function(answer) {
            var newQuantity = selItem.stock_quantity + answer.quantity;
            updateProduct(newQuantity, selItem);        
        });
    });
}

function addItem(){
    inquirer
    .prompt([
        {
            name: "itemName",
            message: "What is the Name of the Item?",
            type: "input"
        },
        {
            name: "departmentName",
            message: "What is the Name of the department of Item?",
            type: "input"
        },
        {
            name: "price",
            message: "What is the price of the Item?",
            type: "number"
        },
        {
            name: "stock",
            message: "How many stock are you adding?",
            type: "number"
        }
    ])
    .then(function(answer) {
        var query = connection.query("INSERT INTO products SET ?",
        {
            product_name : answer.itemName,
            department_name : answer.departmentName,
            price : answer.price,
            stock_quantity : answer.stock

        },
        function(err, res) {
            if (err) throw err;
            inquirer
            .prompt([
            {
                name: "confirm",
                message: " \"" + answer.itemName + "\" sucessfully added.",
                type: "list",
                choices: ["Continue"]
            }
            ])
            .then(function(answer) {
                mainMenu();
            });
        });
    });
}



//Function to update database on SQL server
function updateProduct(newQuantity, selItem) {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [{
                stock_quantity: newQuantity
        },{
            item_id: selItem.item_id
        }],
        function(err, res) {
            if (err) throw err;
            inquirer
            .prompt([
            {
                name: "confirm",
                message: " \"" + selItem.product_name + "\" sucessfully stocked.",
                type: "list",
                choices: ["Continue"]
            }
            ])
            .then(function(answer) {
                mainMenu();
            });
        }
    );
};

function mainMenu(){
    console.clear();
    console.log("\n=================== Manager Menu ====================\n==========================================================")
    inquirer
        .prompt([
            {
            name: "selection",
            message: "Please choose a selection",
            type: "list",
            choices: ["View Products on sale", "View Low Inventory", "Add To Inventory", "Add New Product"]
            }
        ])
        .then(function(answer) {
            var choice = answer.selection;
            switch (choice){
            case ("View Products on sale") :
                    console.clear();
                readAllProducts(true);
                break;
                
            case ("View Low Inventory") :
                    console.clear();
                readLowProducts();
                break;
            
            case ("Add To Inventory") :
                    console.clear();
                readAllProducts(false);
                break;
            
            case ("Add New Product") :
                    console.clear();
                addItem();
                break
            
            default :
                break;
        }
    });
}