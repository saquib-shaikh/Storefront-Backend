//as explain in classroom 
// we are exporting client for connecting to database, database info stored in .env file we destructuring required info here

import dotenv from 'dotenv'
import {Pool} from 'pg'

//initializing the environment variable


dotenv.config()

const {PG_HOST,PG_DB,PG_DB_TEST,PG_USER,PG_PASSWORD,ENV}=process.env

console.log(ENV)

const client =new Pool({
    host:PG_HOST,
    database:ENV==='dev'? PG_DB: PG_DB_TEST, 
    user:PG_USER, 
    password:PG_PASSWORD
})



// if(ENV==='test'){
//     client =new Pool({
//         host:PG_HOST,
//         database:PG_DB_TEST, 
//         user:PG_USER, 
//         password:PG_PASSWORD
//     })

// }

export default client
