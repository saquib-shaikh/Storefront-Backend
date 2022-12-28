//#### Products
//- Index 
//- Show
//- Create [token required]
//- [OPTIONAL] Top 5 most popular products 
//- [OPTIONAL] Products by category (args: product category)

import express, {Request,Response} from 'express';
const productRoutes=express.Router();
import { productType } from './../type/types'
import { ProductData } from './../Model/product'
import verifyToken from './tokenVerifier';

const productEntries=new ProductData

//GET request on http://localhost:3000/products (INDEX)
productRoutes.get('/',async(req:Request,res:Response)=>{
    try{
        const products=await productEntries.index()
        res.status(200)
        res.json(products)
    }catch(err){
        res.status(400)
        res.json(err)
    }
    
})

//POST request on http://localhost:3000/products (CREATE)
productRoutes.post('/',verifyToken,async (req:Request,res:Response)=>{
    try {
        const product:productType={
            name:req.body.name,
            price:req.body.price,
            category:req.body.category
        }
        const prodOrder=await productEntries.create(product)
        res.status(201)
        res.json(prodOrder)

    }catch(err){
        res.status(400)
        res.json(err)
    }
    
})

//GET request on http://localhost:3000/products/:id (SHOW)
productRoutes.get('/:id',async(req:Request,res:Response)=>{
    try{
        const product=await productEntries.show(req.params.id)
        res.status(200)
        res.json(product)
    }catch(err){
        res.status(400)
        res.json(err)

    }

    
})




export default productRoutes;