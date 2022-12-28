"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../Model/users");
const userTest = new users_1.userData();
describe('testing a users model methods', () => {
    it("create method exist", () => {
        expect(userTest.create).toBeDefined();
    });
    it("index method exist", () => {
        expect(userTest.index).toBeDefined();
    });
    it("show method exist", () => {
        expect(userTest.show).toBeDefined();
    });
    it("create method test", async () => {
        const result = await userTest.create({
            username: 'abcdefg',
            firstname: 'saquib',
            lastname: "shaikh",
            password: "Saq@123"
        });
        expect(result.username).toEqual('abcdefg');
        expect(result.firstname).toEqual('saquib');
        expect(result.lastname).toEqual('shaikh');
        expect(result.password_digest).not.toEqual('saquib');
    });
    it("index method test", async () => {
        const result = await userTest.index();
        expect(result[1].username).toEqual('abcdefg');
        expect(result[1].firstname).toEqual('saquib');
        expect(result[1].lastname).toEqual('shaikh');
        expect(result[1].password_digest).not.toEqual('saquib');
    });
    it("show method test", async () => {
        const result = await userTest.show("2");
        expect(result.username).toEqual('abcdefg');
        expect(result.firstname).toEqual('saquib');
        expect(result.lastname).toEqual('shaikh');
        expect(result.password_digest).not.toEqual('saquib');
    });
});
