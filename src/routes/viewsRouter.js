import { Router } from "express";
import ProductManager from '../dao/db/productManager.js';
import CartsManager from "../dao/db/cartManager.js";

const productManager = new ProductManager();
const cartManager = new CartsManager();
const router = Router();

router.get("/products", async (req, res) => {
    const {limit, page, query, sort} = req.query;

    const sortOptions = {
        asd: {price: 1},
        desc: {price: -1}
    }

    const limitModel = limit ? parseInt(limit, 10) : 10;
    const pageModel = page ? parseInt(page, 10) : 1;
    const queryModel = query ?? {};
    const sortModel = sortOptions[sort] ?? undefined;
    
    const products = await productManager.getProducts(limitModel, pageModel, queryModel, sortModel)

    res.render("home", { products: products.payload, prevLink: products.prevLink, nextLink: products.nextLink})
});

router.get("/cart", async (req, res) => {
    const cart = await cartManager.getCartById("6515c211f4aa027b6c347624")

    res.render('cart', {cart})
})

router.get("/chat", (req, res) => {
    req.context.socketServer.on("connection", (socket) => {
        console.log("se conecto", socket.id)
    })
    res.render("chat", {})
});

export default router;