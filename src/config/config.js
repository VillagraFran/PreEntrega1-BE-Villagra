import { config } from "dotenv";
config()

export default {
    enviroment: process.env.ENVIROMENT,
    mongoURL: process.env.MONGO_ATLAS_UR,
    admin_email: process.env.ADMIN_EMAIL,
    admin_password: process.env.ADMIN_PASSWORD,
    jwt_secret: process.env.JWT_SECRET
}