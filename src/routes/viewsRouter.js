import { Router } from "express";
import ProductManager from '../dao/db/productManager.js';
import CartsManager from "../dao/db/cartManager.js";
import publicRoutes from "../middlewares/publicRoutes.js";
import privateRoutes from "../middlewares/privateRoutes.js";


const productManager = new ProductManager();
const cartManager = new CartsManager();
const router = Router();

router.get("/products", privateRoutes, async (req, res) => {

    //----PERFIL----//
    const user = {
        first_name: req.session.first_name,
        last_name: req.session.last_name,
        email: req.session.email,
        rol: req.session.rol === "admin" ?? false,
    }

    //----PRODUCTOS----//
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

    res.render("home", {user: user, products: products.payload, prevLink: products.prevLink, nextLink: products.nextLink })
});

router.get("/cart", privateRoutes, async (req, res) => {
    const cart = await cartManager.getCartById("6515c211f4aa027b6c347624")

    res.render('cart', {cart})
})

router.get("/chat", privateRoutes, (req, res) => {
    req.context.socketServer.on("connection", (socket) => {
        console.log("se conecto", socket.id)
    })
    res.render("chat", {})
});

router.get("/login",publicRoutes, (req, res) => {

    res.render("login")
})

router.get("/singup",publicRoutes, (req, res) => {

    res.render("register")
})

export default router;