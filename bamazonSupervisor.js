//Require Statements
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

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
          console.clear();
          mainMenu();
        });
}

//Reads all products then either continues or proceeds to stock items
function readAllProducts(cont) {
     console.clear();
     console.log("\n=================== DEPARTMENT STATUS ====================");
     console.log("==========================================================");
     connection.query("SELECT *, product_sales - over_head_costs as total_profit From departments", function(err, res) {
          if (err) throw err;
          var departments = res;
          for (var i = 0; i < departments.length; i++){
               console.table([departments[i]]);
          }
          contFunction();
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

function mainMenu(){
     console.clear();
     console.log("\n=================== Manager Menu ====================\n==========================================================")
     inquirer
          .prompt([
               {
               name: "selection",
               message: "Please choose a selection",
               type: "list",
               choices: ["View Product Sales by Department", "Create New Department"]
               }
          ])
          .then(function(answer) {
               var choice = answer.selection;
               switch (choice){
               case ("View Product Sales by Department") :
                    readAllProducts(true);
                    break;
                    
               case ("Create New Department") :
                    readLowProducts();
                    break;
                         
               default :
                    break;
          }
     });
     }