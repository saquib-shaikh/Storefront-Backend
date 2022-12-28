"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userData = void 0;
const database_1 = __importDefault(require("./../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//as discussed in classroom we export class which has all method i.e. show, index, create etc.
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS || ''; //there was error i dont take || '' taken help from mentor help section to solve this error this is tell explicitly the type
//following methods are all reference to classroom we are connecting to database
//running query on database and then we disconnect from database
// then we send a result after running a query
class userData {
    async create(u) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (username,firstname,lastname,password_digest) VALUES($1, $2, $3, $4) RETURNING *';
            const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.username, u.firstname, u.lastname, hash]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`user cant be added ${err}`);
        }
    }
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`pls check error in getting users'${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const results = await conn.query(sql, [id]);
            conn.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`pls check error in getting user ${id} ${err}`);
        }
    }
    //delete is not requirement in projects specification we are adding to run test cases easily
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM users WHERE id=($1)';
            await conn.query(sql, [id]);
            conn.release();
        }
        catch (error) {
            throw new Error(`could not delete user ${error}`);
        }
    }
    //following code discussed in classroom taking reference
    async authenticate(username, password) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE username=($1)';
            const result = await conn.query(sql, [username]);
            console.log(password + pepper);
            conn.release();
            if (result.rows.length > 0) {
                const user = result.rows[0];
                console.log(user);
                if (bcrypt_1.default.compareSync(password + pepper, user.password_digest)) {
                    return user;
                }
            }
            return null;
        }
        catch (err) {
            throw new Error(`pls check authentication failure ${err}`);
        }
    }
}
exports.userData = userData;
