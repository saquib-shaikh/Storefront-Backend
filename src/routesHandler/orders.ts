//#### Orders
//- Current Order by user (args: user id)[token required]
//- [OPTIONAL] Completed Orders by user (args: user id)[token required]


// CREATE TABLE orders(
//     id SERIAL PRIMARY KEY,
//     product_id BIGINT REFERENCES products(id),
//     quantity INTEGER,
//     user_id BIGINT REFERENCES users(id),
//     status VARCHAR(25));


import express, {Request,Response} from 'express';
const orderRoutes=express.Router();
import { orderType } from './../type/types'
import { orderData } from './../Model/orders'
import verifyToken from './tokenVerifier';

const orderEntries=new orderData


// //GET request on http://localhost:3000/orders/user_id (ORDER BY USERID)
// orderRoutes.get('/user_id',(req:Request,res:Response)=>{
//     res.send('youare in order route orderby id')
    
// })

//POST request on http://localhost:3000/orders (CREATE)
orderRoutes.post('/', verifyToken,async (req:Request,res:Response)=>{
    try {
        const order:orderType={
            product_id:req.body.product_id,
            quantity:req.body.quantity,
            user_id:req.body.user_id,
            status:req.body.status
        }
        const prodOrder=await orderEntries.create(order)
        res.status(201)
        res.json(prodOrder)

    }catch(err){
        res.status(400)
        res.json(err)
    }
    
})
//GET request on http://localhost:3000/orders (INDEX)
orderRoutes.get('/',verifyToken,async(req:Request,res:Response)=>{
    try{
        const orders=await orderEntries.index();
        res.status(200)
        res.json(orders)
    }catch(err){
        res.status(400)
        res.json(err)
    }
    
})


//PUT request http://localhost:3000/orders?order=1&status=completed'

orderRoutes.put('/',verifyToken,async(req:Request,res: Response)=>{
    try{
        const status = req.query.status as string;
        const order_Id = parseInt(req.query.order as string);
        const orderUp=await orderEntries.updateStatus(status,order_Id)
        res.status(200)
        res.json(orderUp)
    }catch(err){
        res.status(400)
        res.json(err)
    }
    
})

//GET request http://localhost:3000/orders/current/:user_id
orderRoutes.get('/current/:user_id',verifyToken,async(req:Request,res: Response)=>{
    try{
  
        const user_Id = parseInt(req.params.user_id);
        const currOrder=await orderEntries.getCurrOrdByUserid(user_Id);
        res.status(200)
        res.json(currOrder)
    }catch(err){
        res.status(400)
        res.json(err)
    }
    
})



export default orderRoutes;



