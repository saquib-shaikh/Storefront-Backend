# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 


## API Endpoints requirements
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]




## Data Shapes requiremnets
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)




##  API endpoint implemented
### products
* index
GET request on http://localhost:3000/products (INDEX) [token_required]

request body
{
    name: "camera",
    price:2000,
    category:"extc",
}

* show
GET request on http://localhost:3000/products/:id (SHOW) 

(argument: id)

* Create
POST request on http://localhost:3000/products (CREATE)


### users
* create 
POST request on http://localhost:3000/users (CREATE)

request body
{
    username: "abcdefg",
    firstname:"saquib",
    lastname:"shaikh",
    password:"saq@123"
}

* show
GET request on http://localhost:3000/users/:id (SHOW) [token_required]
(argument: id)

* index 
GET request on http://localhost:3000/users (INDEX) [token_required]

* login
//POST request on http://localhost:3000/authenticate (LOGIN)


### orders
* create
POST request on http://localhost:3000/orders (CREATE) [TOKEN_REQUIRED] 

request body
{
    product_id:3,
    quantity:2,
    user_id:3,
    status:"active"
}

* index 
//GET request on http://localhost:3000/orders (INDEX) [TOKEN_REQUIRED] 


* Current Order by user id
GET request http://localhost:3000/orders/current/:user_id [token_required]
(argument: id)


* update status
PUT request http://localhost:3000/orders?order=1&status=completed [token_required]




### databse Schema
#### tables
* products
(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(150) NOT NULL, 
    price INTEGER NOT NULL,
    category VARCHAR
);


* users
(
    id SERIAL PRIMARY KEY, 
    username VARCHAR NOT NULL, 
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    password_digest VARCHAR NOT NULL
    
);

* orders
(
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER,
    user_id INTEGER REFERENCES users(id),
    status VARCHAR(25)
    
);









