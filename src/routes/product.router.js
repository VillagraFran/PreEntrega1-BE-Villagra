import { Router } from 'express';
import { uploader } from '../middlewares/multer.js';
import ProductManager from '../dao/db/productManager.js';

const productManager = new ProductManager();
const router = Router()

router.get("/", async (req, res) => {
    res.send(await productManager.getProducts())
})

router.post('/', uploader.single('file'), async (req, res) => {
    const { title, description, price, code, stock, category } = req.body;
    const thumbnail = req.file.originalname;

    if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
        return res.status(400).json({ error: "complete todos los campos" });
    }

    const product = await productManager.createProduct(title, description, price,thumbnail, code, stock, category)

    req.context.socketServer.emit('new-product', product)
    res.status(200).send(product)
})

router.delete('/:pid', async (req, res) => {
    const {pid} = req.params;
    const deleteProduct =await productManager.deleteProduct(pid)
    res.send({status:"succes", payload: deleteProduct})
})

export default router;