import { Router } from "express";
import passport from "passport";

const router = Router();

router.post('/login', 
    passport.authenticate("login", {failureRedirect: "/fail" }), 
    async (req, res) => {

        req.session.first_name = req.user.first_name;
        req.session.last_name = req.user.last_name;
        req.session.email = req.user.email;
        req.session.rol = req.user.rol;
        req.session.cart = req.user.cart;
        req.session.isLogged = true;

        res.redirect("/products")
    }
)

router.post('/singup', 
    passport.authenticate("register", {failureRedirect: "/fail" }), 
    async (req, res) => {
        res.redirect("/login")
    }
)

router.post('/logout', (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
        }
        
        res.redirect("/login");
    });
});

router.get('/github',
    passport.authenticate("github", { scope: ["user:email"] })
)

router.get('/githubcallback',
    passport.authenticate("github", { failureRedirect: "/fail" }),
    async (req, res) => {
        req.session.first_name = req.user.first_name
        req.session.last_name = req.user.last_name
        req.session.email = req.user.email;
        req.session.rol = req.user.rol
        req.session.cart = req.user.cart;
        req.session.isLogged = true

        res.redirect("/products")
    }
)

export default router;