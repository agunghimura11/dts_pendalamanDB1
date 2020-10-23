
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'

import mongoose from 'mongoose'

import connectDB from './connect'


const app = express()
connectDB()


app.listen(process.env.PORT || 8000, () => {
  console.log(`App listen on port ${ process.env.PORT || 8000 }`)
})
