import { cartModel } from "../dao/db/models/cart.model.js";
import { ticketModel } from "../dao/db/models/ticket.model.js";
import { userModel } from "../dao/db/models/user.model.js";

class cartRepository {
    async getCartsRepository() {
        const carts = await cartModel.find().lean();
        return carts;
    }

    async getCartByIdRepository(cid) {
        const carts = await cartModel.findById(cid).populate('products.product').lean();
        return carts;
    }

    async createCartRepository(cart) {
        const newCart = await cartModel.create(cart)
        return newCart;
    }

    async addProductRepository(cid, pid) {
        const cart = await cartModel.findById(cid)

        if (!cart) {
            const newCart = {
                owner: owner,
                products: [
                    {
                        product: pid,
                        quantity: 1
                    },
                ]
            }

            await cartModel.create(newCart)
            return(newCart)
        }

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

    async modifyCartRepository(cid) {
        const cart = await cartModel.findOne({"_id": cid})

        cart.products = []

        await cart.save()
        return cart.products;
    }

    async modifyProductRepository(cid, pid, quantity) {
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

    async deleteCartRepository(cid) {
        await cartModel.deleteOne({_id:cid})
        
        return({message: "carrito eliminado"})
    }

    async deleteProductRepository(cid, pid) {
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

    async purchaseRepository(cid) {
        const cart = await cartModel.findOne({"_id": cid}).populate('products.product')
        const buyed = []

        cart.products.filter((pr) => {
            if (pr.quantity > pr.product.stock) {
                return pr;
            } else {
                buyed.push({
                    quantity: pr.quantity,
                    amount: pr.product.price
                })
                const pid = cart.products.findIndex((product) => product.product._id === pr.product._id)
                cart.products.splice(pid, 1)
            }
        })
        await cart.save()

        const amount = buyed.reduce((acc, item) => {
            return acc + (item.quantity * item.amount);
        }, 0);

        const fechaActual = new Date();
        const day = fechaActual.getDate();
        const month = fechaActual.getMonth() + 1;
        const year = fechaActual.getFullYear();

        const purchaser = await userModel.findOne({"cart": cid})

        const ticket = await ticketModel.create({
            purchase_datetime: day +"/"+ month +"/"+ year,
            amount: amount,
            purchaser: purchaser.email
        })

        return ticket;
    }
}

export default cartRepository;