
//initializing token variable in create method we will store token in it
let token="";

import { UserTypeIN } from "../../type/types";
import app from "../../server"
import supertest from "supertest";

const request=supertest(app)

describe("testing user endpoint",()=>{
    it("testing create user and generate token",async()=>{
        const requesting=await request.post('/users')
        .set({
            'content-type':'application/json'
        })
        .send({
            username: "abcdefg",
            firstname:"saquib",
            lastname:"shaikh",
            password:"saq@123"
        });

        token=requesting.body


        expect(requesting.status).toBe(200);
    })



    it("index users when token provided by verifying token",async()=>{
        const requesting=await request.get('/users')
        .set({
            'content-type':'application/json',
            Authorization: `Bearer ${token}`
        })



        expect(requesting.status).toBe(200);
    })



    it("it should not allow to see index if token not provided",async()=>{
        const requesting=await request.get('/users')
        .set({
            'content-type':'application/json',
            Authorization: `Bearer`
        })


        expect(requesting.status).not.toBe(200);
    })

    it("show users when correct token provided by verifying token",async()=>{
        const requesting=await request.get('/users/1')
        .set({
            'content-type':'application/json',
            Authorization: `Bearer ${token}`
        })



        expect(requesting.status).toBe(200);

    })

    it("show users when incorrect token provided by verifying token",async()=>{
        const requesting=await request.get('/users/1')
        .set({
            'content-type':'application/json',
            Authorization: `Bearer`
        })



        expect(requesting.status).not.toBe(200);

    })
})