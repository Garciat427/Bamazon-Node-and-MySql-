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

function mainMenu(){
  console.clear();
  console.log("\n=================== Customer Menu ====================\n==========================================================")
  inquirer
      .prompt([
          {
          name: "selection",
          message: "Please choose a selection",
          type: "list",
          choices: ["Purchase Item", "Exit"]
          }
      ])
      .then(function(answer) {
          var choice = answer.selection;
          switch (choice){
          case ("Purchase Item") :
                  console.clear();
              readAllProducts();
              break;
              
          case ("Exit") :
                  console.clear();
                  connection.end();
              break;

          default :
              break;
      }
  });
}

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
      message: "Enter Item ID you wish to purchase",
      type: "number",
    }
  ])
  .then(function(answer) {
      var selItem = products[(answer.selection - 1)];
      findQuantity(selItem);
  });
}

function findQuantity (selItem) {
  inquirer .prompt([{
    name: "quantity",
    message: "How many \"" + selItem.product_name + "\" would you like to purchase?",
    type: "number",
  }]).then(function(answer) {
    if (answer.quantity > selItem.stock_quantity) {
      outOfStock();
    } else {
      var price = (selItem.price * answer.quantity);
      var newQuantity = selItem.stock_quantity - answer.quantity;
      updateProduct(newQuantity, selItem, price);
      console.log (answer.quantity + " \"" + selItem.product_name + "\" purchased for :$" + price );
      
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
      mainMenu();
    });
  }

function updateProduct(newQuantity, selItem, price) {
  var query = connection.query("UPDATE products SET ? WHERE ?",
    [{stock_quantity: newQuantity},{item_id: selItem.item_id}],
    function(err, res) {
      if (err) throw err;
      findDeptSale(selItem, price);
    }
  );
};

function findDeptSale(selItem, price){
  var query = connection.query("SELECT product_sales FROM departments WHERE ?",
  [{department_name: selItem.department_name}],
    function(err, res) {
      var newDeptSales = (res[0].product_sales + price);
      updateDepartment(newDeptSales, selItem, price);
    }
  );
}

function updateDepartment(newDeptSales, selItem, price){
  var query = connection.query("UPDATE departments SET ? WHERE ?",
  [{product_sales: newDeptSales},{department_name: selItem.department_name}],
    function(err, res) {
      if (err) throw err;
      contFunction();
    }
  );
}

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