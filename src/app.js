import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/viewsRouter.js";
import productRouter from "./routes/product.router.js";
import usersRouter from "./routes/users.router.js";

import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import cookieParser from "cookie-parser";

import { messageModel } from "./dao/db/models/message.model.js";

import { config }from "dotenv";
config()

mongoose.connect(process.env.MONGO_ATLAS_URL)

const app = express()
const httpServer = app.listen(8080, ()=>console.log("on"))
const socketServer = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cookieParser())
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');
app.use("/static", express.static('./public'));

app.use((req, res, next) => {
    req.context = { socketServer }
    next()
});


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

app.use('/api', usersRouter);
app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);

initializePassport();
app.use(passport.initialize())

socketServer.on("connection", (socket) => {
    socket.on("message", async (data) => {
        await messageModel.create(data);
        const messages = await messageModel.find().lean();
        socketServer.emit("new-message", messages);
    })
})