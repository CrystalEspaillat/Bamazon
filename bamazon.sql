-- Drops the database bamazonDB if it exists currently --
DROP DATABASE IF EXISTS bamazonDB;
-- Creates the database bamazonDB --
CREATE DATABASE bamazonDB;

-- Makes it so all of the following code will affect the database bamazonDB --
USE bamazonDB;

-- Creates the table called 'products' within the bamazonDB database --
CREATE TABLE products (

    -- Unique ID for each product --
    item_id INT(10) AUTO_INCREMENT,
    -- Name of each product --
    product_name VARCHAR(100) NOT NULL,
    -- Department that each product belongs to --
    department_name VARCHAR(45) NOT NULL,
    -- Cost to the customer for each product --
    price DECIMAL(9,2),
    -- Amount of each product thats available for purchase --
    stock_quantity INT(3) default 3,
    -- Set the item_id as the primary key --
    PRIMARY KEY (item_id)
);

-- Creates new rows in the products table 
INSERT INTO products (product_name, department_name, price)
VALUES ("Leggings", "Activewear", 30.00);

-- Creates new rows in the products table 
INSERT INTO products (product_name, department_name, price)
VALUES ("Lipstick", "Beauty", 10.00);

-- Creates new rows in the products table 
INSERT INTO products (product_name, department_name, price)
VALUES ("Blender", "Cooking", 200.00);

-- Creates new rows in the products table 
INSERT INTO products (product_name, department_name, price)
VALUES ("Bluetooth Speaker", "Electronics", 100.00);

-- Creates new rows in the products table 
INSERT INTO products (product_name, department_name, price)
VALUES ("Bed", "Furniture", 500.00);

-- Creates new rows in the products table 
INSERT INTO products (product_name, department_name, price)
VALUES ("Matcha Powder", "Gourmet Foods", 10.00);

-- Creates new rows in the products table 
INSERT INTO products (product_name, department_name, price)
VALUES ("Candle", "Home Goods", 5.00);

-- Creates new rows in the products table 
INSERT INTO products (product_name, department_name, price)
VALUES ("Scrabble Game", "Toys", 20.00);

-- Creates new rows in the products table 
INSERT INTO products (product_name, department_name, price)
VALUES ("iPhone", "Electronics", 300.00);

-- Creates new rows in the products table 
INSERT INTO products (product_name, department_name, price)
VALUES ("Coconut Oil", "Gourmet Foods", 30.00);

SELECT * FROM products;