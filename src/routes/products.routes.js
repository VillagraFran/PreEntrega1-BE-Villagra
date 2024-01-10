import { Router } from "express";
import { uploader } from "../middlewares/multer.js";

import {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct
} from "../controllers/product.manager.js";

const router = Router()

router.get('/', getProducts);
router.get('/:pid', getProductById);
router.post('/', uploader.single("file"), createProduct);
router.delete('/:pid', deleteProduct)

export default router;