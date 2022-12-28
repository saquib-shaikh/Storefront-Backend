"use strict";
//as explain in classroom 
// we are exporting client for connecting to database, database info stored in .env file we destructuring required info here
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
//initializing the environment variable
dotenv_1.default.config();
const { PG_HOST, PG_DB, PG_DB_TEST, PG_USER, PG_PASSWORD, ENV } = process.env;
console.log(ENV);
const client = new pg_1.Pool({
    host: PG_HOST,
    database: ENV === 'dev' ? PG_DB : PG_DB_TEST,
    user: PG_USER,
    password: PG_PASSWORD
});
// if(ENV==='test'){
//     client =new Pool({
//         host:PG_HOST,
//         database:PG_DB_TEST, 
//         user:PG_USER, 
//         password:PG_PASSWORD
//     })
// }
exports.default = client;
