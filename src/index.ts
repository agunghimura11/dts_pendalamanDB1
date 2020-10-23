
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'

import connectDB from './connect'
import { Customer, CustomerType } from './mongoose'


const app = express()
connectDB()

const customerModel = new Customer()

app.use(express.json())
app.use((err: Error, req: express.Request, res:express.Response, next:express.NextFunction) => {
 res.status(500).json({
   success: false,
   message: err.message
 }) 
})

// Create customer
app.post("/customers", async (req,res,next) =>{
  let customers: CustomerType | CustomerType[]
  try{
    if(req.body instanceof Array){
      customers = await customerModel.createMany(req.body)
    }else{
      customers = await customerModel.create(req.body)
    }
  }catch(err){
    return next(err)
  }

  res.json(customers) 
})

// get all customer with limit 
app.get("/customers", async (req,res,next) =>{
  const limit = Number(req.body.limit) || 10
  let customers: CustomerType[]
  try{
    customers = await customerModel.getAll(limit)
  }catch(err){
    return next(err)
  }

  res.json(customers) 
})

// Search customer
app.get('/customers/search', async (req,res,next) => {
  let customers: CustomerType[]
  const name = req.query.name ? {
    first_name: {
      $regex: req.query.name as string,
      $options: 'i'
    }
  } : {}

  try{
    customers = await customerModel.getByName(name)
  }catch(err){
    return next(err)
  }

  res.json(customers)
})

//Get customer by type
app.get('/customers/type/:type', async (req,res,next) => {
  let customers: CustomerType[]
  const type = req.params.type as string

  try{
    customers = await customerModel.getByType(type)
  }catch(err){
    return next(err)
  }

  res.json(customers)
})

// Get customer by age
app.get("/customers/age/:age", async function(req,res,next) {
  let customers: CustomerType[]
  try{
    customers = await customerModel.getByAge(parseInt(req.params.age))
  }catch(error){
    return next(error)
  }

  return res.send(customers)
})

// Get customer by state
app.get("/customers/state/:state", async function(req,res,next){
  let customers: CustomerType[]
  try{
    customers = await customerModel.getByState(req.params.state)
  }catch(error){
    return next(error)
  }

  return res.send(customers)
})

app.listen(process.env.PORT || 8000, () => {
  console.log(`App listen on port ${ process.env.PORT || 8000 }`)
})
