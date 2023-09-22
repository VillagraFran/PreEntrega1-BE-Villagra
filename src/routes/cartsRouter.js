import { Router } from "express";
import CartsManager from "../dao/filesystem/cartsManager.js";

const cartsManager = new CartsManager();
const router = Router();

router.get("/:cid", async (req, res) => {
    const cid = parseInt(req.params.cid)
    const carts = await cartsManager.getCartById(cid)

    return res.send(carts)
})

router.post("/:cid", async (req, res) => {
    const cid = parseInt(req.params.cid)

    const createCart = await cartsManager.createCart(cid)

    return res.send(createCart)
})

router.post("/:cid/product/:pid", async (req, res) => {
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)

    const createCart = await cartsManager.addProductCart(cid, pid)

    return res.send(createCart)
})

export default router;