import { Router } from "express"
import { nodemailer } from "nodemailer"

const router = Router()

router.get("/mail", (req, res) => {
    const message = nodemailer.createTransport({
        
    })
})