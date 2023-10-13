import mongoose from "mongoose";

const usersCollection = "users";

const usersSchema = new mongoose.Schema({
    first_name: {
        type:String,
        required: true
    },
    last_name: {
        type:String,
    },
    age: {
        type:Number,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
    },
    rol:{
        type:String,
    }
});

const userModel = mongoose.model(usersCollection, usersSchema)

export {userModel};