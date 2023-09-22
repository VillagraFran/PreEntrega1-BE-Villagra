import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    thumbnail: {
        type:String,
        required: true
    },
    code: {
        type:Number,
        unique: true,
        required: true
    },
    stock: {
        type:Number,
        required: true
    },
    category: {
        type:String,
        required: true
    }
});

const productModel = mongoose.model(productsCollection, productSchema);

export { productModel };