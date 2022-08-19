const Contenedor= require("./contenedor");
const handlebars = require("express-handlebars")
const {Server: HttpServer} = require("http")
const {Server: IOServer} = require("socket.io")

const express = require("express")
const { Router } = express

const app = express()
const PORT = 8080
const routerProductos = Router()

const httpServer = new HttpServer(app)
const ioServer = new IOServer(httpServer)

// Funciones middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static("public"))

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

// app.get("/", (req,res)=>{
//     res.sendFile("/views/layouts/index.hbs",{root:__dirname})
// })

// prodAdd.addEventListener("click", ()=>{
//     socket.emit("nuevo-producto-cliente", {"title":prodName, "price":prodPrice, "thumbnail":prodThumb, "id": 5})
// })

// Agregar un producto
// routerProductos.post("/", (req, res)=>{
//     const contenedor = new Contenedor("./productos.txt")
//     const objProducto = req.body
//     contenedor.save(objProducto)
//     res.render("partials/formulario",{productList:false, agregado:true})
// })

ioServer.on("connection",socket=>{
    console.log("usuario conectado", socket.id)
    socket.emit("mensaje-server", "hola cliente")

    socket.on("disconnect",()=>{
        console.log("usuario desconectado", socket.id)
    })
})

httpServer.listen(PORT, err => {
    if(err) throw new Error("error en server")
    console.log(`servidor en puerto ${PORT}`)
})
