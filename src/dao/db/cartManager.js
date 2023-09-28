import { cartModel } from "../models/cart.model.js";

class cartManager {
    async getCarts() {
        const carts = await cartModel.find().lean();
        return carts;
    }

    async getCartById(cid) {
        const carts = await cartModel.findOne({_id: cid}).populate('products.product');
        return carts;
    }

    async createCart(cart) {
        const newCart = await cartModel.create(cart)
        return newCart.id;
    }

    async addProduct(cid, pid) {
        const cart = await cartModel.findOne({"_id": cid})

        const product = cart.products.find(({ product }) => product.toString() === pid)

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

    async modifyCart(cid) {
        const cart = await cartModel.findOne({"_id": cid})

        cart.products = []

        await cart.save()
        return cart.products;
    }

    async modifyProduct(cid, pid, quantity) {
        const cart = await cartModel.findOne({"_id": cid})

        const product = cart.products.findIndex(({ product }) => product.toString() === pid)

        if (product === -1 ) {
            return({error: "no hay un producto con ese Id"})
        } else {
            cart.products[product].quantity = quantity;
        }

        await cart.save();
        return cart.products[product];
    }

    async deleteCart(cid) {
        await cartModel.deleteOne({_id:cid})
        
        return({message: "carrito eliminado"})
    }

    async deleteProduct(cid, pid) {
        const cart = await cartModel.findOne({"_id": cid})

        const product = cart.products.findIndex(({ product }) => product.toString() === pid)

        if (product === -1) {
            return({error: "el producto no existe"})
        } else {
            cart.products.splice(product, 1)
        }

        await cart.save();
        return cart.products;
    }
}

export default cartManager;