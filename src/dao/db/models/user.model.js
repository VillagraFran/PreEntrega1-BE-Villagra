import mongoose from "mongoose";

const usersCollection = "users";

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number,
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: String,
    rol: String,
    cart: {
      type: String,
      ref: 'carts',
    },
  });

const userModel = mongoose.model(usersCollection, usersSchema)

export {userModel};