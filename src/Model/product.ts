import client from "../database";
import { productType } from "../type/types";

//as discussed in class we export which has all method i.e. show, index, create etc.


//following methods are all reference to classroom we are connecting to database
//running query on database and then we disconnect from database
// then we send a result after running a query
export class ProductData{
    async show(id: string):Promise<productType>{
        try{

            const conn= await client.connect()
            
            const sql='SELECT * FROM products WHERE id=($1)'
            const result=await conn.query(sql,[id])
        
            conn.release()
            return result.rows[0]
        }catch(err){
            throw new Error(`pls check cannot get product show ${err}`)
            
        }

    }



    async index(): Promise<productType[]>{
        try{

            const conn=await client.connect()
            const sql='SELECT * FROM products'
            
            const res= await conn.query(sql)
            // console.log(res)
            conn.release()
            return res.rows
        }catch(err){
            throw new Error(`pls check could not found products index: ${err}`)
        }




    }async create(product: productType):Promise<productType>{
        try{
            const conn= await client.connect()
            
            const sql= 'INSERT INTO products(name, price, category) VALUES($1, $2, $3) RETURNING *'
            const result=await conn.query(sql,[product.name,product.price,product.category])
            // console.log(result)
            conn.release()
            return result.rows[0]
        }catch(err){
            throw new Error(`pls check cant create product :${err}`)
        }
    }


    async delete (id: number): Promise<void> {
        try {
            const conn = await client.connect()
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *'
            await conn.query(sql, [id])
            conn.release()
            return
        } catch (error) {
            throw new Error(`could not delete product ${error}`)
        }
    } 
}
