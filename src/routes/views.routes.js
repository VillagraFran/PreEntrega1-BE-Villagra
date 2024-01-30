import { createLogger } from "winston";
import ProductRepository from "../repository/product.repository.js";
import { Router } from "express";
import privateRoutes from "../middlewares/privateRoutes.js";
import publicRoutes from "../middlewares/publicRoutes.js";
import CartRepository from "../repository/cart.repository.js";

const productRepository = new ProductRepository;
const cartRepository = new CartRepository;
const router = Router();

router.get("/", privateRoutes, async (req, res) => {

    //----PERFIL----//
    const user = req.user

    if (user.rol === "admin" || user.rol === "premium") {
        user.rol = true
    } else {
        user.rol = undefined
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

    const products = await productRepository.get(limitModel, pageModel, queryModel, sortModel)
    
    products.payload.forEach(product => {
        product["buyer"]= user.cart._id
        product["buyer_rol"]= req.user.rol
    });

    res.render("home", {
        user: user,
        products: products.payload, 
        prevLink: products.prevLink, 
        nextLink: products.nextLink
    })
});

router.get("/cart", privateRoutes, async (req, res) => {
    const cid = req.user.cart._id;
    const cart = await cartRepository.getById(cid);

    cart.products.forEach(product => {
        product["buyer"]= req.user.cart._id
    });

    res.render('cart', {cart: cart})
})

// router.get("/chat", privateRoutes, (req, res) => {
//     req.context.socketServer.on("connection", (socket) => {
//         logger.info("se conecto" + socket.id)
//     })
//     res.render("chat", {})
// });

router.get("/login",publicRoutes, (req, res) => {
    res.render("login")
})

router.get("/singup",publicRoutes, (req, res) => {
    res.render("register")
})

export default router;