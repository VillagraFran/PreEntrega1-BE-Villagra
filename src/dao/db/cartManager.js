import { cartModel } from "../models/cart.model.js";

class cartManager {
    async getCarts() {
        const carts = await cartModel.find().lean();
        return carts;
    }

    async createCart(cart) {
        const newCart = await cartModel.create(cart)
        return newCart.id;
    }

    async addProduct(cid, pid) {
        const cart = await cartModel.findOne({"_id": cid})

        const product = cart.products.find((pr) => pr.product === pid)

        if (product !== undefined) {
            product.quantity++;
        } else {
            const pr = {
                product: pid,
                quantity: 1
            }

            cart.products.push(pr)
        }

        await cart.save();
        return cart;
    }

    async addProductById(cid, pid) {
        const cart = await cartModel.find({"_id": cid})
        return cart;
    }
}

export default cartManager;