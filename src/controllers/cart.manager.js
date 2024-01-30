import { cartModel } from "../DAO/mongo/models/cart.model.js";
import { productModel } from "../DAO/mongo/models/product.model.js";
import { ticketMail } from "../services/emailMessage.service.js";
import CartRepository from "../repository/cart.repository.js";
import TicketRepository from "../repository/ticket.repository.js";

const cartRepository = new CartRepository();
const ticketRepository= new TicketRepository();

export const createCart = async(req, res)=>{
    try {
        const cart={ products:[] };
        const newCart= cartRepository.create(cart);
        return newCart;
        
    } catch (error) {
        throw error;
    };
};

export const getCart = async(req, res)=>{
    try {
        const {cid} = req.params;
        if (cid) {
            const cart= await cartRepository.getById(cid);
            return res.redirect('/cart');
        } else {
            const cart= await cartRepository.get();
            return res.redirect('/cart');
        };
        
    } catch (error) {
        throw error;
    };
};

export const addCartProduct = async (req, res) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;

        const cart = await cartRepository.getById(cid);

        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        const product = cart.products.find(({ product }) => product._id.toString() === pid);

        if (product !== undefined) {
            await cartModel.updateOne(
                { _id: cid, 'products.product': pid },
                { $inc: { 'products.$.quantity': 1 } }
            );
        } else {
            await cartModel.updateOne(
                { _id: cid },
                { $push: { products: { product: pid, quantity: 1 } } }
            );
        }

        const updatedCart = await cartRepository.getById(cid);

        return res.redirect('/');

    } catch (error) {
        throw error;
    }
};

export const deleteCart = async(req, res)=>{
    try {
        const {cid} = req.params;
        const cart = await cartRepository.delete(cid);
        return res.json({message:"carrito eliminado", id: cart._id});
    } catch (error) {
        throw error;
    };
};

export const deleteCartProduct = async(req, res) => {
    try {
        const pid = req.params.pid;
        const cid = req.params.cid;

        const cart = await cartModel.findOne({"_id": cid});

        const product = cart.products.findIndex(({ product }) => product.toString() === pid);

        if (product === -1) {
            return({error: "el producto no existe"});
        } else {
            cart.products.splice(product, 1);
        };

        await cart.save();
        return res.redirect("/cart");

    } catch (error) {
        throw error;
    };
};

export const purchase= async(req, res) =>{
    const purchaser = req.user;
    const {cid} = req.params;

    const cart = await cartModel.findOne({"_id": cid}).populate('products.product');
    const buyed = [];

    cart.products.filter(async(pr) => {
        if (pr.quantity > pr.product.stock) {
            return pr;
        } else {
            buyed.push({
                product: pr.product._id,
                quantity: pr.quantity,
                amount: pr.product.price
            });

            const updatedStock = pr.product.stock - pr.quantity;
            await productModel.updateOne({ _id: pr.product._id }, { $set: { stock: updatedStock } });

            const pid = cart.products.findIndex((product) => product.product._id === pr.product._id);
            cart.products.splice(pid, 1);

            await cart.save();
        }
    });

    const amount = buyed.reduce((acc, item) => {
        return acc + (item.quantity * item.amount);
    }, 0);

    const fechaActual = new Date();
    const date = {
        day: fechaActual.getDate(),
        month: fechaActual.getMonth()+1,
        year: fechaActual.getFullYear()
    };

    const ticket = await ticketRepository.create(date, amount, purchaser);
    await ticketMail(ticket)

    return res.redirect("/");
};