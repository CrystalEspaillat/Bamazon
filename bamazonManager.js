///////////////////////////
// Package Requirements
///////////////////////////
var mysql = require("mysql");
var Table = require("cli-table");
var figlet = require("figlet");
var inquirer = require("inquirer");
require("dotenv").config();

///////////////////////////
// MySQL Connection
///////////////////////////

// Create connection for database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASS,
  database: "bamazonDB"
});

// Start connection
connection.connect(function(err) {
  if (err) throw err;
});

///////////////////////////
// Program Functions
///////////////////////////

// Function that presents Manager with options
function giveOptions () {

    inquirer.prompt([
        {
          type: "rawlist",
          name: "options",
          message: "Hello Store Manager, what would you like to do",
          choices: [
              "View Products for Sale", 
            //   "Add New Products", 
              "View Low Stock", 
              "Add to Stock"]
        },

      // When the user responds...
    ]).then(function(answer) {

        switch (answer.options) {
            case "View Products for Sale":
            viewProducts();
            break;

            // case "Add New Products":
            // addProducts();
            // break;

            case "View Low Stock":
            viewLowStock();
            break;

            case "Add to Stock":
            addStock();
            break;

        };

    });
};


// Function to display products for sale on CLI
function viewProducts() {

    // Select all products from products data base
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;

      // Display CLI table with products
        // Create a table for CLI
          var table = new Table({
            head: ['ID', 'Product Name', 'Department', 'Price', 'Stock']
          , colWidths: [10, 20, 20, 10, 10]
          });

        // Push each row to CLI table
        for (i = 0; i < res.length; i++) {
          table.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]);
        }

        // Display table to CLI
        console.log(table.toString() + "\n");

        // Start the next function here to make question display on bottom of CLI
        giveOptions();
    });
  };


// Function to display products for sale on CLI
function viewLowStock() {

    // Select all products from products data base
    connection.query("SELECT * from products GROUP BY item_id HAVING stock_quantity <= 1", function(err, res) {
      if (err) throw err;

      // Display CLI table with products
        // Create a table for CLI
          var table = new Table({
            head: ['ID', 'Product Name', 'Department', 'Price', 'Stock']
          , colWidths: [10, 20, 20, 10, 10]
          });

        // Push each row to CLI table
        for (i = 0; i < res.length; i++) {
          table.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]);
        }

        // Display table to CLI
        console.log(table.toString() + "\n");

        // Start the next function here to make question display on bottom of CLI
        giveOptions();
    });
  };

//Function to ask user questions
function addStock() {

    // Query to access all products
    var getItemQuery = "SELECT product_name, department_name, price, stock_quantity FROM products WHERE ?";
    // Query to update the stock quantity of selected item
    var updateStockQuery = "UPDATE products SET ? WHERE ?";

    // Ask questions to user
    inquirer.prompt([
      {
        type: "input",
        name: "item",
        message: "Enter the ID of the product you want to stock up: \n"
      },
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to add to the stock? "
      }
    // When the user responds...
    ]).then(function(answer) {

      // Check all products in table
      connection.query(getItemQuery, {item_id: answer.item}, function(err, res) {
        // If there is an error, display it
        if (err) throw err;
        // Loop through each row in table
        for (i = 0; i < res.length; i++) {

          // Store new quantity in a variable
          newQuantity = res[i].stock_quantity + parseInt(answer.quantity);

        // Then update the database to reflect the new quantity
        connection.query(updateStockQuery,
            [
            {
                stock_quantity: newQuantity
            },
            {
                item_id: answer.item
            }
            ],
            function(err, res) {
            if (err) throw err;
        });

        console.log("Thank you for restocking!");
        giveOptions();
        }

      });
    })
  };


///////////////////////////
// Run Program
///////////////////////////

// Run function to display awesome store title
figlet('Store Manager', function(err, data) {
    console.log(data)
    // Run the function that reads the products
    giveOptions();
});


// Add to inventory - updating stock_quantity
// Add new product - insert into products
// view low inventory - establish what low inventory is 
// // select * from products GROUP BY item_id HAVING stock_quantity <= 1,