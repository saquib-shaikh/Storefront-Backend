import { orderData } from "../../Model/orders";
import { ProductData } from "../../Model/product";
import { userData } from "../../Model/users";

const user1=new userData
const product1=new ProductData 
const orderTest= new orderData();

describe('testing a order model methods',()=>{

    beforeAll(async () => {
        await user1.create({
            username:"qwerty",
            firstname: 'saquib',
            lastname: 'shaikh',
            password: 'Saq@1234'
        });
        
        await product1.create({
          name: 'plate',
          price: 200,
          category: 'utensils'
        });
    })

    
    afterAll(async () => {
        await orderTest.delete(1)
        await product1.delete(1)
        await product1.delete(1)
    });


    it("create method exist",()=>{
        expect(orderTest.create).toBeDefined();
    })




    it("index method exist",()=>{
        expect(orderTest.index).toBeDefined();
    })


    it("show method exist",()=>{
        expect(orderTest.show).toBeDefined();
    })

    it("getCurrOrdByUserid",()=>{
        expect(orderTest.getCurrOrdByUserid).toBeDefined()
    })

    it("updateStatus",()=>{
        expect(orderTest.updateStatus).toBeDefined()
    })


    it("create method test",async ()=>{
        const result=await orderTest.create({
            product_id: 1,
            quantity: 12,
            user_id:1,
            status:"active"
        })
        expect(result).toEqual({
            id:1,
            product_id:1,
            quantity: 12,
            user_id:1,
            status:"active"

        })
    })

    it("index method test",async()=>{
        const result= await orderTest.index();
        expect(result).toEqual([{
            id:1,
            product_id:1,
            quantity: 12,
            user_id:1,
            status:"active"
        }])
    })
    it("show method test",async()=>{
        const result= await orderTest.show("1");
        expect(result).toEqual({
            id:1,
            product_id:1,
            quantity: 12,
            user_id:1,
            status:"active"
        })

    })
    it("status update test",async()=>{
        const result= await orderTest.updateStatus("completed",1)
        expect(result).toEqual({
            id:1,
            product_id:1,
            quantity: 12,
            user_id:1,
            status:"completed"
        })

    })
    it("get current order by user id",async()=>{
        const result= await orderTest.getCurrOrdByUserid(1)
        expect(result).toEqual({
            id:1,
            product_id:1,
            quantity: 12,
            user_id:1,
            status:"completed"
        })

    })
    
    
    




})