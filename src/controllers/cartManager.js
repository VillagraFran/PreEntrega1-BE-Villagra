import CartService from "../services/carts.service.js"

const cartService = new CartService();

class cartManager {
    async getCarts() {
        try {
            const carts = await cartService.getCartsService();
            return carts;
        } catch (error) {
            console.log("service-error:", error)
            throw error;
        }
    }

    async getCartById(cid) {
        try {
            const cart = await cartService.getCartByIdService(cid)
            return cart;
        } catch (error) {
            console.log("service-error:", error)
            throw error;
        }
    }

    async createCart(cart) {
        try {
            const newCart = await cartService.createCartService(cart)
            return newCart.id;
        } catch (error) {
            console.log("service-error:", error)
            throw error;
        }
    }    
    
    async addProduct(cid, pid, owner) {
        try {
            const cart = await cartService.addProductService(cid, pid, owner)
            return cart;
        } catch (error) {
            console.log("service-error:", error)
            throw error;
        }
    }

    async modifyCart(cid) {
        try {
            const cart = await cartService.modifyCartService(cid)
            return cart;
        } catch (error) {
            console.log("service-error:", error)
            throw error;
        }
    }

    async modifyProduct(cid, pid, quantity) {
        try {
            const modifyCart = await cartService.modifyProductService(cid, pid, quantity)
            return modifyCart;
        } catch (error) {
            console.log("service-error:", error)
            throw error;
        }
    }

    async deleteCart(cid) {
        try {
            const deleteCart = await cartService.deleteCartService(cid)
            return deleteCart;
        } catch (error) {
            console.log("service-error:", error)
            throw error;
        }
    }

    async deleteProduct(cid, pid) {
        try {
            const cart = await cartService.deleteProductService(cid, pid)
            return cart;
        } catch (error) {
            console.log("service-error:", error)
            throw error;
        }
    }
}

export default cartManager;