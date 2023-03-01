import express from "express"
import { router as productRouter } from "./routes/products/products.routes.js"
import { router as cartRouter } from "./routes/cart/cart.routes.js"
import { router as viewsRouter } from "./routes/views/views.routes.js"
import { router as sessionsRouter } from "./routes/sessions/sessions.routes.js"
import { __dirname } from "../src/utils.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import "./config/dbConfig.js"
import session from "express-session"
import MongoStore from "connect-mongo"
import passport from "passport"

const app = express()

app.use(session({
    name: 'session',
    secret:'pw123' ,
    cookie: {
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://alefeas_:pwcoder123@alejo.uockjha.mongodb.net/coderDb?retryWrites=true&w=majority",
        ttl: 3600
    })
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(passport.initialize())
app.use(passport.session())

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
app.use("/session", sessionsRouter)
app.use('/', viewsRouter)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))