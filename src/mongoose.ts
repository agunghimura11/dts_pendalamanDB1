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

type Keyword = {
    first_name: {
        $regex: string,
        $options: string
    }
} | {}

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
        let result: CustomerType
        try {
            result = await this.model.create(data)
            console.log(result)
        } catch(error) {
            throw error
        }
        return result
    }

    async createMany(data: CustomerType[]) {
        let result: CustomerType[]
        try{
            result = await this.model.insertMany(data)
            console.log(result)
        }catch(error){
            throw error
        }

        return result
    }

    async deleteMany(){
        try {
            await this.model.deleteMany({})
        } catch(error){
            throw error
        }
    }

    async getAll(limit: number){
        let result: CustomerType[]
        try{
            //result = await this.model.find({}).limit(limit)
            result = await this.model.aggregate([
                {
                    "$addFields": {
                        "fullname": { "$concat": ["firstname", " ", "lastname"] }
                    }
                }
            ]).limit(limit).exec()
        }catch(err){
            throw err
        }

        return result
    }

    async getByName(name: Keyword){
        let result: CustomerType[]
        try{
            result = await this.model.find({
                ...name
            })
        }catch(err){
            throw err
        }

        return result
    }

    async getByType(type:string){
        let result : CustomerType[]
        try{
            result = await this.model.aggregate([{
                $match : {
                    customer_type: {
                        $eq: type
                    }
                }
            }]).exec()
        }catch(err){
            throw err
        }

        return result
    }

    async getByState(state: string){
        let customer : CustomerType[]
        try{
            customer = await this.model.aggregate([
                {
                    $match : {
                        state : {
                            $eq : state
                        }
                    }
                }
            ]).exec()
        }catch(err){
            throw err
        }

        return customer
    }

    async getByAge(_age: number) {
        let customer : CustomerType[] | null
        try{
            customer = await this.model.find({age: { $lt: _age }})
        }catch(error){
            throw error
        }

        return customer
    }
}