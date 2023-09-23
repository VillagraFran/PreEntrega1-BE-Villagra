import { Router } from 'express';
import CartsManager from "../dao/db/cartManager.js";

const cartsManager = new CartsManager();
const router = Router()

router.get("/", async (req, res) => {
    res.send(await cartsManager.getCarts())
})

router.post("/", async(req, res) => {
    const cart ={ products: [] }
    const newCart = await cartsManager.createCart(cart)
    res.send({message: "carrito creado", id: newCart})
})

router.post("/:cid/product/:pid", async(req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid

    const addProduct =await cartsManager.addProduct(cid, pid)

    res.send(addProduct)
})

export default router;