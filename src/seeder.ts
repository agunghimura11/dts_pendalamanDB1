import dotenv from 'dotenv'
dotenv.config()

import ConnecDB from './connect'
import customers from './data/customers'
import {Customer} from './mongoose'

ConnecDB()

const customerModel = new Customer()

const importData = async () => {
    try {
        await customerModel.deleteMany()
        await customerModel.createMany(customers)

        console.log("Data import successfully")
        process.exit()
    } catch(error){
        console.log(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try{
        await customerModel.deleteMany()

        console.log("data destroy")
        process.exit()
    }catch(error){
        console.error(`${error}`)
        process.exit(1)
    }
}

if(process.argv[2] === '-d') {
    destroyData()
}else{
    importData()
}

