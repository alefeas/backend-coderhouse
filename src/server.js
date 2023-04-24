import express from 'express'
import { router as apiRouter } from './routers/app.routers.js'
import { router as viewsRoutes } from './routers/views/views.routes.js'
import path from 'path'
import { fileURLToPath } from 'url';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import passport from 'passport'
import { initializePassport } from './config/passport.config.js'
import { logGreen, logCyan, logRed } from './utils/console.utils.js'
import flash from 'connect-flash'
import cookieParser from 'cookie-parser'
import { ENV_CONFIG } from './config/enviroment.config.js'

const app = express()


//Middlewares
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use('/statics', express.static(path.resolve(__dirname, '../public')))
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())
app.use(flash())

//Router
app.use('/api', apiRouter)
app.use('/', viewsRoutes)

//Templates

app.engine('handlebars', handlebars.engine())
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'handlebars');

//Server

const server = app.listen(ENV_CONFIG.PORT, "127.0.0.1", () => {
    const host = server.address().address;
    const port = server.address().port;
    logGreen(`Server is up and running on http://${host}:${port}`);
});

// Server error
server.on("error", (error) => {
    logRed("There was an error starting the server");
    logRed(error);
});

//Sockets
const io = new Server(server)

io.on('connection', (socket)=>{
    logCyan("new client connected");
    app.set('socket', socket)
    app.set('io', io)
    socket.on('login', user =>{
        socket.emit('welcome', user)
        socket.broadcast.emit('new-user', user)
    })
})