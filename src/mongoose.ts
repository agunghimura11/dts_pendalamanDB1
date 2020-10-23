import mongoose from 'mongoose'

export type CustomerType = {
    first_name: string
      last_name: string
      age: number
      customer_type: string
      street: string
      city: string
      state: string
      zip_code: string
    phone_number: string
}

export type CustomerDocument = mongoose.Document & CustomerType

const CustomerSchema = new mongoose.Schema({
    first_name: {type:String, required: true},
      last_name: {type:String, required: true},
      age: {type:Number, required: true},
      customer_type: {type:String, required: true},
      street: {type:String, required: true},
      city: {type:String, required: true},
      state: {type:String, required: true},
      zip_code: {type:String, required: true},
      phone_number: {type: String, required: true},
})

export class Customer {
    private model: mongoose.Model<CustomerDocument>

    constructor() {
        this.model = mongoose.model('customer', CustomerSchema)
    }

    async create(data: CustomerType) {
        try {
            const result = await this.model.create(data)
            console.log(result)
        } catch(error) {
            throw error
        }
    }

    async createMany(data: CustomerType[]) {
        try{
            const result = await this.model.insertMany(data)
            console.log(result)
        }catch(error){
            throw error
        }
    }

    async deleteMany(){
        try {
            await this.model.deleteMany({})
        } catch(error){
            throw error
        }
    }
}