import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const productCollection = "products"

const productSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true
    },
    description: { 
        type: String, 
        required: true
    },
    code: { 
        type: String, 
        required: true, 
        unique: true
    },
    price: { 
        type: Number, 
        required: true
    },
    stock: { 
        type: Number, 
        required: true
    },
    category: { 
        type: String, 
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    thumbnails:{
        type: [],
        required: true,
        default: []
    }
})

productSchema.plugin(mongoosePaginate)

export const ProductModel = mongoose.model(productCollection, productSchema)