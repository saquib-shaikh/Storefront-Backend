
//initializing token variable in create method we will store token in it
let token="";

import app from "../../server"
import supertest from "supertest";

const request=supertest(app)

describe("testing products endpoint",()=>{
    beforeAll(async()=>{
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

    })
    it("testing create products end point by verifying token",async()=>{
        const requesting=await request.post('/products')
        .set({
            'content-type':'application/json',
            Authorization: `Bearer ${token}`
        })
        .send({
            name: "camera",
            price:2000,
            category:"extc",
        });



        expect(requesting.status).toBe(201);
    })

    it("testing index products end point ",async()=>{
        const requesting=await request.get('/products')



        expect(requesting.status).toBe(200);
    })



    it("testing show products end point non-protected endpoint",async()=>{
        const requesting=await request.get('/products/1')

        expect(requesting.status).toBe(200);
    })

})

