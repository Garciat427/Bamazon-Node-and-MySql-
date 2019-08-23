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
  createProduct();
});

//Functions
function readProducts() {
     console.log("Selecting all products...\n");
     connection.query("SELECT * FROM products", function(err, res) {
       if (err) throw err;
       // Log all results of the SELECT statement
       console.log(res);
       connection.end();
     });
   }
   

readProducts()
//Inquirer
/* inquirer
  .prompt([
    {
      name: "department",
      message: "Please select depart",
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
