import { Router } from 'express';
import CartsManager from "../dao/db/cartManager.js";

const cartsManager = new CartsManager();
const router = Router()

router.get("/", async (req, res) => {
    res.send(await cartsManager.getCarts())
})

router.get("/:cid", async (req, res) => {
    const cid = req.params.cid

    res.send(await cartsManager.getCartById(cid))
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

router.put("/:cid", async (req, res) => {
    const cid = req.params.cid

    res.send(await cartsManager.modifyCart(cid))
})

router.put("/:cid/product/:pid", async(req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const {quantity} = req.body;

    const modifyProduct =await cartsManager.modifyProduct(cid, pid, quantity)

    res.send(modifyProduct)
})

router.delete("/:cid", async (req, res) => {
    const cid = req.params.cid

    res.send(await cartsManager.deleteCart(cid))
})

router.delete("/:cid/product/:pid", async(req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid

    const deleteProduct =await cartsManager.deleteProduct(cid, pid)

    res.send(deleteProduct)
})

export default router;