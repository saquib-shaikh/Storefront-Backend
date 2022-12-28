"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//initializing token variable in create method we will store token in it
let token = "";
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
describe("testing user endpoint", () => {
    it("testing create user and generate token", async () => {
        const requesting = await request.post('/users')
            .set({
            'content-type': 'application/json'
        })
            .send({
            username: "abcdefg",
            firstname: "saquib",
            lastname: "shaikh",
            password: "saq@123"
        });
        token = requesting.body;
        expect(requesting.status).toBe(200);
    });
    it("index users when token provided by verifying token", async () => {
        const requesting = await request.get('/users')
            .set({
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        });
        expect(requesting.status).toBe(200);
    });
    it("it should not allow to see index if token not provided", async () => {
        const requesting = await request.get('/users')
            .set({
            'content-type': 'application/json',
            Authorization: `Bearer`
        });
        expect(requesting.status).not.toBe(200);
    });
    it("show users when correct token provided by verifying token", async () => {
        const requesting = await request.get('/users/1')
            .set({
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        });
        expect(requesting.status).toBe(200);
    });
    it("show users when incorrect token provided by verifying token", async () => {
        const requesting = await request.get('/users/1')
            .set({
            'content-type': 'application/json',
            Authorization: `Bearer`
        });
        expect(requesting.status).not.toBe(200);
    });
});
