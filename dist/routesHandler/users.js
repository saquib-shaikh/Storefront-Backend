"use strict";
//#### Users
//- Index [token required]
//- Show [token required]
//- Create N[token required]
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersRoutes = express_1.default.Router();
const users_1 = require("./../Model/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenVerifier_1 = __importDefault(require("./tokenVerifier"));
const userEntries = new users_1.userData;
//POST request on http://localhost:3000/users (CREATE)
usersRoutes.post('/', async (req, res) => {
    //res.send('youare in users post route create')
    try {
        const user = {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };
        const user1 = await userEntries.create(user);
        const token = jsonwebtoken_1.default.sign({ user: user1 }, process.env.TOKEN_SECRET || '');
        res.status(200);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
//GET request on http://localhost:3000/users (INDEX)
usersRoutes.get('/', tokenVerifier_1.default, async (req, res) => {
    // res.send('youare in users get route index')
    try {
        const user1 = await userEntries.index();
        res.status(200);
        res.json(user1);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
//GET request on http://localhost:3000/users/:id (SHOW)
usersRoutes.get('/:id', tokenVerifier_1.default, async (req, res) => {
    // res.send('youare in users get route show')
    try {
        const id = req.params.id;
        const user1 = await userEntries.show(id);
        res.status(200);
        res.json(user1);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
//POST request on http://localhost:3000/authenticate (LOGIN)
usersRoutes.post('/authenticate', async (req, res) => {
    try {
        const user = {
            username: req.body.username,
            password: req.body.password
        };
        const authUser = await userEntries.authenticate(user.username, user.password);
        // const tkn = jwt.sign({user: authUser}, process.env.TOKEN_SECRET!)
        if (authUser !== null) {
            const token = jsonwebtoken_1.default.sign({ user: authUser }, process.env.TOKEN_SECRET || '');
            res.json(token);
            res.status(200);
        }
        else {
            res.json("wrong password");
        }
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
exports.default = usersRoutes;
// /users
// users/:id
// users/:id
