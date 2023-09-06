import express from "express"
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartsRouter.js"
import viewsRouter from "./routes/viewsRouter.js"

const app = express()
const httpServer = app.listen(8080, ()=>console.log("on"))
const soketServer = new Server(httpServer)

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('views engine', 'handlebars')
app.use(express.static('./src/public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', viewsRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)