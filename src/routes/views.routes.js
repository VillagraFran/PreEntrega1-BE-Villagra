import ProductRepository from "../repository/product.repository.js";
import { Router } from "express";

const productRepository = new ProductRepository;
const router = Router();

router.get("/products", async (req, res) => {

    //----PERFIL----//
    const user = req.user

    if (user.rol === "usuario") {
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

    const products = await productManager.getProducts(limitModel, pageModel, queryModel, sortModel)

    res.render("home", {
        user: user, 
        cartId: JSON.stringify(user.cart._id), 
        products: products.payload, 
        prevLink: products.prevLink, 
        nextLink: products.nextLink
    })
});

router.get("/cart", async (req, res) => {
    const cart = req.user.cart;
    res.render('cart', {cart: cart.products})
})

// router.get("/chat", privateRoutes, (req, res) => {
//     req.context.socketServer.on("connection", (socket) => {
//         logger.info("se conecto" + socket.id)
//     })
//     res.render("chat", {})
// });

router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/singup", (req, res) => {
    res.render("register")
})

export default router;