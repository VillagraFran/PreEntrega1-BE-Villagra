import CartRepository from "../repository/carts.repository.js"
import sendMail from "../services/emailMessage.service.js";

const cartRepository = new CartRepository();

class cartManager {
    async getCarts() {
        try {
            const carts = await cartRepository.getCartsRepository();
            return carts;
        } catch (error) {
            throw error;
        }
    }

    async getCartById(cid) {
        try {
            const cart = await cartRepository.getCartByIdRepository(cid)
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async createCart(cart) {
        try {
            const newCart = await cartRepository.createCartRepository(cart)
            return newCart;
        } catch (error) {
            throw error;
        }
    }    
    
    async addProduct(cid, pid) {
        try {
            const cart = await cartRepository.addProductRepository(cid, pid)
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async modifyCart(cid) {
        try {
            const cart = await cartRepository.modifyCartRepository(cid)
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async modifyProduct(cid, pid, quantity) {
        try {
            const modifyCart = await cartRepository.modifyProductRepository(cid, pid, quantity)
            return modifyCart;
        } catch (error) {
            throw error;
        }
    }

    async deleteCart(cid) {
        try {
            const deleteCart = await cartRepository.deleteCartRepository(cid)
            return deleteCart;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(cid, pid) {
        try {
            const cart = await cartRepository.deleteProductRepository(cid, pid)
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async purchase(cid) {
        const ticket = await cartRepository.purchaseRepository(cid)
        await sendMail(ticket)
        return ticket;
    }
}

export default cartManager;