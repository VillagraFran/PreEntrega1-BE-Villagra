import { Router } from "express";
import CartsManager from "../src/cartsManager";

const cartsManager = new CartsManager;
const router = Router();

router.get("/:cid", async (req, res) => {
    const cid = parseInt(req.params.cid)
    const carts = await cartsManager.getCartById(cid)

    return res.send(carts)
})

router.post("/:cid/product/:pid", (req, res) => {
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)

    const createCart = cartsManager.createCarts(cid, pid)

    return res.status(200).json(createCart)
})

export default router;