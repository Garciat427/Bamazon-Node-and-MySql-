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
function readAllDepts() {
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



function addDept(){
    inquirer
    .prompt([
        {
            name: "deptName",
            message: "What is the Name of the Department?",
            type: "input"
        },
        {
            name: "over_head",
            message: "What is the over head costs of the department?",
            type: "number"
        },
        {
            name: "sales",
            message: "What is the current amount of product sales",
            type: "number"
        }
    ])
    .then(function(answer) {
        var query = connection.query("INSERT INTO departments SET ?",
        {
               department_name : answer.deptName,
               over_head_costs : answer.over_head,
               over_head_costs : answer.sales
        },
        function(err, res) {
            if (err) throw err;
            inquirer
            .prompt([
            {
                name: "confirm",
                message: " \"" + answer.deptName + "\" sucessfully added.",
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
     console.log("\n=================== Supervisor Menu ====================\n==========================================================")
     inquirer
          .prompt([
               {
               name: "selection",
               message: "Please choose a selection",
               type: "list",
               choices: ["View Product Sales by Department", "Create New Department", "Exit"]
               }
          ])
          .then(function(answer) {
               var choice = answer.selection;
               switch (choice){
               case ("View Product Sales by Department") :
                    readAllDepts();
                    break;
                    
               case ("Create New Department") :
                    addDept()
                    break;
                         
               case ("Exit") :
                    connection.end();
                    break
               default :
                    connection.end();
                    break;
          }
     });
     }