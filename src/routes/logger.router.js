import { Router } from "express";
import logger from "../middlewares/logger.js";

const router = Router()

router.get("/loggerTest",(req, res) => {
    logger.fatal()
    logger.error()
    logger.warning()
    logger.info()
    logger.http()
    logger.debug()
})

export default router;