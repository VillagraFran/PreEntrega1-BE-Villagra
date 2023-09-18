import { Router } from "express";
import ProductManager from '../productManager.js';

const productManager = new ProductManager;
const router = Router();

router.get("/ver", (req, res) => {
    req.context.socketServer.on('connection', (socket) => {
        console.log("se conecto", socket.id)
    })
    const products = productManager.getProducts()
    res.render("home", { products })
});

export default router;