import CartRepository from "../repository/cart.repository.js";
import TicketRepository from "../repository/ticket.repository.js";

const cartRepository = new CartRepository();
const ticketRepository= new TicketRepository();

export const createCart = async(req, res)=>{
    try {
        const cart={ products:[] };
        const newCart= cartRepository.create(cart);
        res.json(newCart);
        
    } catch (error) {
        throw error;
    };
};

export const getCart = async(req, res)=>{
    try {
        const {cid} = req.params;
        if (cid) {
            const cart= await cartRepository.getById(cid);
            return res.json(cart);
        } else {
            const cart= await cartRepository.get();
            return res.json(cart);
        };
        
    } catch (error) {
        throw error;
    };
};

export const deleteCart = async(req, res)=>{
    try {
        const {cid} = req.params;
        const cart = await cartRepository.delete(cid);
        res.json({message:"carrito eliminado", id: cart._id});
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
        return res.json(cart);

    } catch (error) {
        throw error;
    };
};

export const purchase= async(req, res) =>{
    const purchaser = req.user;

    const cart = await cartModel.findOne({"_id": cid}).populate('products.product');
    const buyed = [];

    cart.products.filter((pr) => {
        if (pr.quantity > pr.product.stock) {
            return pr;
        } else {
            buyed.push({
                quantity: pr.quantity,
                amount: pr.product.price
            });
            const pid = cart.products.findIndex((product) => product.product._id === pr.product._id);
            cart.products.splice(pid, 1);
        }
    });
    
    await cart.save();

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
    return ticket;
};