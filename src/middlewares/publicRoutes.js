const publicRoutes = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        return res.redirect("/");
    }

    next();
}

export default publicRoutes;