import { productType } from "../../type/types";
import { ProductData } from "../../Model/product";
import productRoutes from "../../routesHandler/product";

const prodductTest= new ProductData();

describe('testing a product model methods',()=>{

    afterAll(async () => {
        await prodductTest.delete(2)
    });

    it("create method exist",()=>{
        expect(prodductTest.create).toBeDefined();
    })


    it("index method exist",()=>{
        expect(prodductTest.index).toBeDefined();
    })


    it("show method exist",()=>{
        expect(prodductTest.show).toBeDefined();
    })


    it("create method test",async ()=>{
        const result=await prodductTest.create({
            name: 'camera',
            price: 1200,
            category:"electronics"
        })
        expect(result).toEqual({
            id:2,
            name: 'camera',
            price: 1200,
            category:"electronics"

        })
    })

    it("index method test",async()=>{
        const result= await prodductTest.index();
        expect(result).toEqual([{
            id:2,
            name: "camera",
            price: 1200,
            category:"electronics"
        }])
    })

    it("show method test",async()=>{
        const result= await prodductTest.show("2");
        expect(result).toEqual({
            id:2,
            name: 'camera',
            price: 1200,
            category:"electronics"
        })

    })
    
    




})