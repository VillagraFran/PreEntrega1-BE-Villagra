import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";
import publicRoutes from "../middlewares/publicRoutes.js";

const router = Router();

router.post('/login', publicRoutes, async (req, res) => {
    const {email, password} = req.body;

    const user = await userModel.findOne({email, password})

    req.session.first_name = user.first_name;
    req.session.last_name = user.last_name;
    req.session.email = user.email;
    req.session.rol = user.rol;
    req.session.isLogged = true;

    res.redirect("/products")
})

router.post('/singup', publicRoutes, async (req, res) => {

    const {first_name, last_name, age, email, password} = req.body;
    let rol = "usuario"

    const findUser = await userModel.findOne({ email });

    if (findUser) {
        return res.redirect("/login")
    }

    if (email === "adminCoder@coder.com") {
        rol = "admin"
        const user = await userModel.create({first_name, last_name, age, email, password, rol})

        req.session.first_name = first_name;
        req.session.last_name = last_name;
        req.session.email = email;
        req.session.rol = rol;
        req.session.isLogged = true;

        return res.redirect("/products")
    }

    const user = await userModel.create({first_name, last_name, age, email, password, rol})

    req.session.first_name = first_name;
    req.session.last_name = last_name;
    req.session.email = email;
    req.session.rol = rol;
    req.session.isLogged = true;

    res.redirect("/products")
})

export default router;