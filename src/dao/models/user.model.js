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
    role: String,
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'carts',
      require: true,
    },
  });

const userModel = mongoose.model(usersCollection, usersSchema)

export {userModel};