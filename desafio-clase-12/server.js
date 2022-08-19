const Contenedor= require("./contenedor");
const express = require("express")
const {Server: HttpServer} = require("http")
const {Server: IOServer} = require("socket.io")
const handlebars = require("express-handlebars")

const app = express()
const httpServer = new HttpServer(app)
const ioServer = new IOServer(httpServer)

app.use(express.static("public"))
const PORT = 8080

// Seteo de handlebars
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials"
    })
)
app.set("view engine", "hbs")
app.set("views", "./views")

// Mostrar tabla de productos
app.get("/", async (req, res)=>{
    const contenedor = new Contenedor("./productos.txt")
    let productos = await contenedor.getAll()
    res.render("partials/productos", {productList:true, agregado:false, products:productos})
})

// Comunicacion servidor-cliente
ioServer.on("connection", socket=>{
    console.log("usuario conectado", socket.id)
    socket.on("disconnect",()=>{
        console.log("usuario desconectado", socket.id)
    })
    // Productos agregados
    socket.on("newProduct-client", socket=>{
        ioServer.sockets.emit("newProduct-server", socket)
        const contenedor = new Contenedor("./productos.txt")
        contenedor.save(socket)
    })
    // Chat
    socket.on("mensaje-cliente", socket=>{
        ioServer.sockets.emit("mensaje-server", socket)
    })
})

httpServer.listen(PORT, err => {
    if(err) throw new Error("error en server")
    console.log(`servidor en puerto ${PORT}`)
})
