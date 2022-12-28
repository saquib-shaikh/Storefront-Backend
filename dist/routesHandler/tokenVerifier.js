"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
//reference for following code was taked from classroom
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    try {
        const authorizeHead = req.headers.authorization;
        const token = authorizeHead ? authorizeHead.split(' ')[1] : '';
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || '');
        next();
    }
    catch (err) {
        res.status(401);
        next("invalid token");
    }
};
exports.verifyToken = verifyToken;
exports.default = exports.verifyToken;
