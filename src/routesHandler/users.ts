//#### Users
//- Index [token required]
//- Show [token required]
//- Create N[token required]

import express, {Request,Response} from 'express';
const usersRoutes=express.Router();
import {userData} from './../Model/users'
import {UserTypeIN,UserTypeRt} from './../type/types'
import jwt from 'jsonwebtoken'
import verifyToken from './tokenVerifier';

const userEntries=new userData

//POST request on http://localhost:3000/users (CREATE)
usersRoutes.post('/',async (req:Request,res:Response)=>{
    //res.send('youare in users post route create')
    try{
        const user: UserTypeIN={
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        }
        const user1= await userEntries.create(user)


        const token=jwt.sign({user:user1},process.env.TOKEN_SECRET || '')
        res.status(200)
        res.json(token)

    }catch(err){
        res.status(400)
        res.json(err)
    }
    
})



//GET request on http://localhost:3000/users (INDEX)
usersRoutes.get('/',verifyToken,async(req:Request,res:Response)=>{
   // res.send('youare in users get route index')
    try{
        const user1= await userEntries.index()
        res.status(200)
        res.json(user1)
    }catch(err){
        res.status(400)
        res.json(err)

    }
    
})



//GET request on http://localhost:3000/users/:id (SHOW)
usersRoutes.get('/:id',verifyToken,async(req:Request,res:Response)=>{
   // res.send('youare in users get route show')
   try{
       const id=req.params.id;
       const user1=await userEntries.show(id)

       res.status(200)

       res.json(user1)

       
   }catch(err){
       res.status(400)
       res.json(err)
   }
    
})

//POST request on http://localhost:3000/authenticate (LOGIN)
usersRoutes.post('/authenticate',async(req:Request,res:Response)=>{
    try {
        const user:UserTypeIN= {
            username: req.body.username,
            password: req.body.password
        }

        const authUser = await userEntries.authenticate(user.username, user.password)
       // const tkn = jwt.sign({user: authUser}, process.env.TOKEN_SECRET!)
        if(authUser!==null){
            const token=jwt.sign({user:authUser},process.env.TOKEN_SECRET || '')
            res.json(token)
            res.status(200)
        }
        else{
            res.json("wrong password")
           }
        
        } catch(error) {
        res.status(400)
        res.json(error)
    }
})




export default usersRoutes;

// /users
// users/:id
// users/:id