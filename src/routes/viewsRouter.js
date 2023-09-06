import { Router } from "express";
import ProductManager from '../productManager.js';

const productManager = new ProductManager;
const router = Router();

router.get("/realtimepoducts", (req, res) => {
    const products = productManager.getProducts()

    res.render("home", { products })
});

export default router;