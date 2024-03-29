import { cartModel } from "../DAO/mongo/models/cart.model.js";

class cartRepository{
    async create(cart){
        const newCart= await cartModel.create(cart);
        return newCart;
    };

    async get(){
        const cart= await cartModel.find().populate("products.product").lean();
        return cart;
    };

    async getById(cid){
        const cart= await cartModel.findById(cid).populate("products.product").lean();
        return cart;
    };

    async delete(cid){
        const cart= await cartModel.deleteOne(cid)
    }
}

export default cartRepository;