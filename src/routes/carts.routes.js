import { Router } from "express";
import {
    createCart,
    getCart,
    addCartProduct,
    deleteCart,
    deleteCartProduct,
    purchase
} from "../controllers/cart.manager.js";
import privateRoutes from "../middlewares/privateRoutes.js";

const router = Router();

router.get('/', getCart);
router.get('/:cid', getCart);
router.post('/', createCart);
router.post('/:cid/product/:pid', addCartProduct);
router.delete('/:cid', deleteCart);
router.get('/:cid/product/:pid', deleteCartProduct);
router.post('/:cid/purchase',privateRoutes, purchase);

export default router;