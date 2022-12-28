"use strict";
//#### Orders
//- Current Order by user (args: user id)[token required]
//- [OPTIONAL] Completed Orders by user (args: user id)[token required]
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// CREATE TABLE orders(
//     id SERIAL PRIMARY KEY,
//     product_id BIGINT REFERENCES products(id),
//     quantity INTEGER,
//     user_id BIGINT REFERENCES users(id),
//     status VARCHAR(25));
const express_1 = __importDefault(require("express"));
const orderRoutes = express_1.default.Router();
const orders_1 = require("./../Model/orders");
const tokenVerifier_1 = __importDefault(require("./tokenVerifier"));
const orderEntries = new orders_1.orderData;
// //GET request on http://localhost:3000/orders/user_id (ORDER BY USERID)
// orderRoutes.get('/user_id',(req:Request,res:Response)=>{
//     res.send('youare in order route orderby id')
// })
//POST request on http://localhost:3000/orders (CREATE)
orderRoutes.post('/', tokenVerifier_1.default, async (req, res) => {
    try {
        const order = {
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            user_id: req.body.user_id,
            status: req.body.status
        };
        const prodOrder = await orderEntries.create(order);
        res.status(201);
        res.json(prodOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
//GET request on http://localhost:3000/orders (INDEX)
orderRoutes.get('/', tokenVerifier_1.default, async (req, res) => {
    try {
        const orders = await orderEntries.index();
        res.status(200);
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
//PUT request http://localhost:3000/orders?order=1&status=completed'
orderRoutes.put('/', tokenVerifier_1.default, async (req, res) => {
    try {
        const status = req.query.status;
        const order_Id = parseInt(req.query.order);
        const orderUp = await orderEntries.updateStatus(status, order_Id);
        res.status(200);
        res.json(orderUp);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
//GET request http://localhost:3000/orders/current/:user_id
orderRoutes.get('/current/:user_id', tokenVerifier_1.default, async (req, res) => {
    try {
        const user_Id = parseInt(req.params.user_id);
        const currOrder = await orderEntries.getCurrOrdByUserid(user_Id);
        res.status(200);
        res.json(currOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.default = orderRoutes;
