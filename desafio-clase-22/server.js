const Contenedor= require("./contenedor");
const express = require("express")
const {Server: HttpServer} = require("http")
const {Server: IOServer} = require("socket.io")
const handlebars = require("express-handlebars")

const {optionsMariaDB}  = require("./mariaDB/conexionMariaDB")
const knexMariaDB = require("knex")(optionsMariaDB)

const {optionsSQLite}  = require("./sqlite3/conexionSQLite")
const knexSQLite = require("knex")(optionsSQLite)

const app = express()
const httpServer = new HttpServer(app)
const ioServer = new IOServer(httpServer)

const { Router } = express
const routerProductos = Router()

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

// Carga mensajes
app.get("/chat/mensajes", async (req,res)=>{
    const contenedor = new Contenedor(knexSQLite,"misMensajes")
    const respuesta = await contenedor.getMessages()
    res.json({respuesta})
})

// Mostrar tabla de productos
app.get("/", async (req, res)=>{
    const contenedor = new Contenedor(knexMariaDB, "misproductos")
    let productos = await contenedor.getAll()
    res.render("partials/productos", {productList:true, agregado:false, products:productos})
})

// Devolver un producto por id
app.get("/:id", async (req,res)=>{
    let {id} = req.params
    id = parseInt(id.slice(1))
    const contenedor = new Contenedor(knexMariaDB, "misproductos")
    const respuesta = await contenedor.getById(id)
    res.json({respuesta})
})

// Actualizar un producto por id
app.put("/:id", async(req, res)=>{
    let {id} = req.params
    id = id.slice(1)
    id = parseInt(id)
    const objProducto = req.body
    const contenedor = new Contenedor(knexMariaDB, "misproductos")
    const respuesta = await contenedor.updateById(objProducto, id, admin)
    res.json({respuesta})
} )

// Agregar un producto
app.post("/", async (req, res)=>{
    const contenedor = new Contenedor(knexMariaDB, "misproductos")
    const objProducto = req.body
    const respuesta = await contenedor.save(objProducto, admin)
    res.json({respuesta})
})

// Borrar un producto por id
app.delete("/:id", async (req,res)=>{
    let {id} = req.params
    id = id.slice(1)
    id = parseInt(id)
    const contenedor = new Contenedor(knexMariaDB, "misproductos")
    const respuesta = await contenedor.deleteById(id, admin)
    res.json({respuesta})
})

// 404 en productos
app.get("*", async (req,res)=>{
    res.json({
		error: -2,
		description: "Ruta no implementada"
	});
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
        const contenedor = new Contenedor(knexMariaDB, "productos")
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
