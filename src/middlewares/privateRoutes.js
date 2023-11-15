import jwt from "jsonwebtoken";
import { userModel } from "../dao/db/models/user.model.js";
import { userDTO } from "../dto/userDTO.js";

const privateRoutes = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login");
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.redirect("/login");
        }
        req.user = decoded;
        const { userId } = req.user;
        const user = await userModel.findById(userId).populate('cart').lean()
        req.user = userDTO(user);
        next();
    });
};

export default privateRoutes;
