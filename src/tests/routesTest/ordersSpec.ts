
//initializing token variable in create method we will store token in it
let token="";

import app from "../../server"
import supertest from "supertest";

const request=supertest(app)

describe("testing orders endpoint",()=>{

//before we test on orders table we need to create a products and users table.
//because id of products and users are used as foreign key in orders table

    beforeAll(async()=>{
        const user1=await request.post('/users')
        .set({
            'content-type':'application/json'
        })
        .send({
            username: "abcd123",
            firstname:"saquib",
            lastname:"shaikh",
            password:"saq@123"
        });

        token=user1.body

        const product1=await request.post('/products')
        .set({
            'content-type':'application/json',
            Authorization: `Bearer ${token}`
        })
        .send({
            name: "camera",
            price:2000,
            category:"extc",
        });

        

    })
    it("testing create orders end point by verifying token",async()=>{
        const requesting=await request.post('/orders')
        .set({
            'content-type':'application/json',
             Authorization: `Bearer ${token}`
        })
        .send({
            product_id:3,
            quantity:2,
            user_id:3,
            status:"active"
        });

        expect(requesting.status).toBe(201);
    })

    it("testing create orders end point by verifying token",async()=>{
        const requesting=await request.post('/orders')
        .set({
            'content-type':'application/json',
             Authorization: `Bearer`
        })
        .send({
            product_id:3,
            quantity:2,
            user_id:3,
            status:"active"
        });

        expect(requesting.status).not.toBe(201);
    })

    it("testing current order by user_id",async()=>{
        const requesting=await request.get('/orders/current/3')
        .set({
            'content-type':'application/json',
            Authorization: `Bearer ${token}`
        })

        expect(requesting.status).toBe(200);
    })
})


