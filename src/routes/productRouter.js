import { Router } from "express";
import ProductManager from '../dao/filesystem/productManager.js';

const productManager = new ProductManager();
const router = Router();

router.get("/", (req, res) => {
    const limit = req.query.limit
    const products = productManager.getProducts()

    if (limit) {
        return res.send(products.slice(0, limit))
    }

    return res.send(products)
});

router.get("/:pid", (req, res) => {
    const pid = parseInt(req.params.pid)
    const findProduct = productManager.getProductById(pid)

    return res.send(findProduct);
});

router.post("/", (req, res) => {
    const { title, description, price, thumbnail, code, stock, category } = req.body;

    if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
        return res.status(400).json({ error: "complete todos los campos" });
    }

    const addProduct = productManager.addProduct(title, description, price, thumbnail, code, stock, category);

    req.context.socketServer.emit('new-product', addProduct)
    return res.status(200).send();
});

router.put("/:pid", (req, res) => {
    const pid = parseInt(req.params.pid)
    const { fieldToUpdate, valueUpdated } = req.body;

    if (fieldToUpdate === "id") {
        return res.status(400).json({ error: "el id del producto no puede ser cambiado" });

    } else if (!fieldToUpdate || !valueUpdated) {
        return res.status(400).json({ error: "complete los campos para actualizar el producto" });

    }

    productManager.updateProduct(pid, fieldToUpdate, valueUpdated);

    return res.status(200).json({ message: "Producto actualizado exitosamente" });
});

router.delete("/:pid", (req, res) => {
    const pid = parseInt(req.params.pid)

    const deletePid = productManager.deleteProduct(pid)

    req.context.socketServer.emit('delete-product', deletePid)
    return res.status(200).json({ message: "Producto eliminado" });
})

export default router;