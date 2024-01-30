import { Router } from "express";
import { uploader } from "../middlewares/multer.js";

import {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct
} from "../controllers/product.manager.js";
import publicRoutes from "../middlewares/publicRoutes.js";
import privateRoutes from "../middlewares/privateRoutes.js";

const router = Router()

router.get('/', getProducts);
router.get('/:pid', getProductById);
router.post('/',privateRoutes, uploader.single("file"), createProduct);
router.post('/delete/:pid',privateRoutes, deleteProduct)

export default router;