# Storefront Backend Project


## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to run project

### setting up databases

* in terminal run `su postgres`
* then start psql by running `psql`
* now create two database user assign rights on database to user
   `CREATE USER shopping_user1 WITH PASSWORD 'password123';`
   `CREATE DATABSE shopping`
   `CREATE DATABASE shopping_test`
   `GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user1`
   `GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user1;`
* check database is created or not by checking if error is there or not while running commands


"test": "npm run build && set ENV=test && db-migrate --env test up && jasmine --env && db-migrate reset --env test",

### database and server port

the database is running on PORT 5432
server is running on PORT 3000

### Running a project

* now open project folder in vs-code
* take new terminal
* run command `npm install yarn -g` then `yarn global add db-migrate` then `yarn add db-migrate db-migrate-pg`


#### package installation
* run command `yarn` to install all dependencies
* check all dependencies installed from following.
if anyone is missing from following list run following command

for following dependencies run `npm install <dependencies name>`

  "dependencies": {
    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "db-migrate": "^0.11.13",
    "db-migrate-pg": "^1.2.2",
    "dotenv": "^16.0.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "pg": "^8.5.1",
    "supertest": "^6.2.2",
    "typescript": "^4.1.3"

for following dependecies run `npm install --save-dev <dependencies name>` to add in dev dependency
  "devDependencies": {
    "@types/bcrypt": "^5.0.0",
    "@types/express": "^4.17.9",
    "@types/jasmine": "^3.6.3",
    "@types/jsonwebtoken": "^8.5.8",
    "@types/pg": "^7.14.7",
    "@types/supertest": "^2.0.11",
    "jasmine": "^3.6.4",
    "jasmine-spec-reporter": "^6.0.0",
    "jasmine-ts": "^0.3.0",
    "ts-node": "^9.1.1",
    "tsc-watch": "^4.2.9"


#### testing a project
* run following command to run the test
`npm run test`

this will show all the passing testcases

* to start server run following command
`yarn watch` 