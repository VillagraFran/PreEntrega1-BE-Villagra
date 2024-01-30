import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from 'swagger-ui-express';
import __dirname from "./utils/index.js";
import Assert from "assert";
import handlebars from "express-handlebars"
import session from "express-session";
import MongoStore from "connect-mongo";

import initializePassport from "./config/passport.config.js";

import productRouter from "./routes/products.routes.js";
import userRouter from "./routes/users.routes.js";
import cartRouter from "./routes/carts.routes.js";
import viewRouter from "./routes/views.routes.js"
import privateRoutes from "./middlewares/privateRoutes.js";

import { Server } from "socket.io";
import { config } from "dotenv";
config();

mongoose.connect(process.env.MONGO_ATLAS_URL)

const app = express()
const httpServer = app.listen(8080, ()=>console.log("on"))

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_ATLAS_URL,
            ttl: 100
        }),
        secret:"jksajskajska",
        resave: false,
        saveUninitialized: false,
    })
)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cookieParser())
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');
app.use("/static", express.static('./public'));

app.use('/', viewRouter)
app.use('/api', userRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

initializePassport();
app.use(passport.initialize())