import express from "express"
import { router as productRouter } from "./routes/products/products.routes.js"
import { router as cartRouter } from "./routes/cart/cart.routes.js"
import { router as viewsRouter } from "./routes/views/views.routes.js"
import __dirname from "../src/utils.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import "./config/dbConfig.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

const PORT = process.env.PORT || 8080

const httpServer = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

const io = new Server(httpServer)

io.on('error', error => console.log(`Error in server ${error}`))

io.on('connection', (socket)=>{
    console.log("new client connected");
    app.set('socket', socket)
    app.set('io', io)
    socket.on('login', user =>{
        socket.emit('welcome', user)
        socket.broadcast.emit('new-user', user)
    })
})

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use('/', viewsRouter)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))