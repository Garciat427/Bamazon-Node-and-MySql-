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
       }
       connection.end();
     });
   }
//Inquirer
/* inquirer
  .prompt([
    {
      name: "selection",
      message: "Enter ",
      type: "list",
      choices: ["Show", "Actor"]
    }
  ])
  .then(function(answer) {
    // Call findShow if looking for show
    // Else call findActor
    if (answer.search === "show") {
      tv.findShow(answer.term);
    } else {
      tv.findActor(answer.term);
    }
  });
 */
