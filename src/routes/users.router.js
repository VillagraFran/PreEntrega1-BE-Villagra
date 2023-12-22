import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();


const router = Router();

router.post('/login', 
    passport.authenticate("login", {failureRedirect: "/fail" }), 
    async (req, res) => {

        const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.cookie("token", token, {
            maxAge: 100000,
            httpOnly: true
        })
        res.redirect("/api/current")
    }
)

router.post('/singup', 
    passport.authenticate("register", {failureRedirect: "/fail" }), 
    async (req, res) => {
        res.redirect("/login")
    }
)

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect("/login");
});

router.get('/github', 
    passport.authenticate("github", { scope: ["user:email"] })
);

router.get('/githubcallback', 
    passport.authenticate("github", { failureRedirect: "/fail" }), 
    async (req, res) => {
        const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/products");
    }
);

router.get('/current',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        res.send(req.cookies);
    }
);

export default router;