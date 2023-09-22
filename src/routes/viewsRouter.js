import { Router } from "express";
import ProductManager from '../dao/db/productManager.js';

const productManager = new ProductManager();
const router = Router();

router.get("/ver", async (req, res) => {
    const products =await productManager.getProducts()
    res.render("home", { products })
});

router.get("/chat", (req, res) => {
    req.context.socketServer.on("connection", (socket) => {
        console.log("se conecto", socket.id)
    })
    res.render("chat", {})
});

export default router;