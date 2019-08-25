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
  readAllProducts();
});

//Functions
function readAllProducts() {
     console.log("\n=================== PRODUCT CATALOUGE ====================");
     console.log("==========================================================");
     connection.query("SELECT * FROM products", function(err, res) {
       if (err) throw err;
       var products = res;
       for (var i = 0; i < products.length; i++){
          console.log("||  Item ID: " + products[i].item_id + "  ||  Item Name: " + products[i].product_name + "\n\tDepartment Name: " + products[i].department_name + "\n\tItem Price: $" + products[i].price + "\tItem Stock: " + products[i].stock_quantity);
          console.log ("----------------------------------------------------------");
       };
       findItem(products);
     });
   }
//Inquirer
function findItem(products) {
  inquirer
  .prompt([
    {
      name: "selection",
      message: "Enter Item ID you wish to purchase or enter 0 to exit",
      type: "number",
    }
  ])
  .then(function(answer) {
    if (answer.selection === 0){
      connection.end();
    } else {
      var selItem = products[(answer.selection - 1)];
      if (selItem.stock_quantity > 0) {
        findQuantity(selItem);
      } else {
        outOfStock();
      }
    }
  });
}

function findQuantity (selItem) {
  inquirer
  .prompt([
    {
      name: "quantity",
      message: "How many \"" + selItem.product_name + "\" would you like to purchase?",
      type: "number",
    }
  ])
  .then(function(answer) {
    if (answer.quantity > selItem.stock_quantity) {
      outOfStock();
    } else {
      var price = (selItem.price * answer.quantity);
      var newQuantity = selItem.stock_quantity - answer.quantity;
      console.log (answer.quantity + " \"" + selItem.product_name + "\" purchased for :$" + price );
      updateProduct(newQuantity, selItem)
    }
  });
}
  
function outOfStock() {
  inquirer
  .prompt([
    {
      name: "confirm",
      message: "Unfortunately, there isn't enough stock to sell that item. Please select another Item.",
      type: "list",
      choices: ["Continue"]
    }
  ])
  .then(function(answer) {
    readAllProducts();
  });
}

function updateProduct(newQuantity, selItem) {
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: newQuantity
      },
      {
        item_id: selItem.item_id
      }
    ],
    function(err, res) {
      if (err) throw err;
      
      inquirer
        .prompt([
          {
            name: "confirm",
            message: "Item Sucessfully Purchased",
            type: "list",
            choices: ["Continue"]
          }
        ])
        .then(function(answer) {
          readAllProducts();
        });
    }
  );
};