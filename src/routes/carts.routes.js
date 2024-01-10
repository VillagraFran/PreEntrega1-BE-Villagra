import { Router } from "express";
import {
    createCart,
    getCart,
    deleteCart,
    deleteCartProduct,
    purchase
} from "../controllers/cart.manager.js";

const router = Router();

router.get('/', getCart);
router.get('/:cid', getCart);
router.post('/', createCart);
router.delete('/:cid', deleteCart);
router.delete('/:cid/product/:pid', deleteCartProduct);
router.post('/:cid/purchase', purchase);

export default router;