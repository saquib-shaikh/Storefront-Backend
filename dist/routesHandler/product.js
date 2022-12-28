"use strict";
//#### Products
//- Index 
//- Show
//- Create [token required]
//- [OPTIONAL] Top 5 most popular products 
//- [OPTIONAL] Products by category (args: product category)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRoutes = express_1.default.Router();
const product_1 = require("./../Model/product");
const tokenVerifier_1 = __importDefault(require("./tokenVerifier"));
const productEntries = new product_1.ProductData;
//GET request on http://localhost:3000/products (INDEX)
productRoutes.get('/', async (req, res) => {
    try {
        const products = await productEntries.index();
        res.status(200);
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
//POST request on http://localhost:3000/products (CREATE)
productRoutes.post('/', tokenVerifier_1.default, async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };
        const prodOrder = await productEntries.create(product);
        res.status(201);
        res.json(prodOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
//GET request on http://localhost:3000/products/:id (SHOW)
productRoutes.get('/:id', async (req, res) => {
    try {
        const product = await productEntries.show(req.params.id);
        res.status(200);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.default = productRoutes;
