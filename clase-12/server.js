const express = require("express")
const {Server: HttpServer} = require("http")
const { emit } = require("process")
const {Server: IOServer} = require("socket.io")

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = process.env.PORT || 8080
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.sendFile("/index.html", { root: __dirname})
})

let productos = [
    {id:1, nombre: "producto 1", precio: "100"},
    {id:2, nombre: "producto 2", precio: "200"},
    {id:3, nombre: "producto 3", precio: "300"}
]

io.on("connection", (socket =>{
    console.log("usuario conectado")
    const mensaje = {
        mensaje: "ok",
        productos
    }
    socket.emit("mensaje-servidor", mensaje)

    socket.on("producto-nuevo", (producto)=>{
        productos.push(producto)
        const mensaje = {
            mensaje:"producto agregado",
            productos
        }
        io.sockets.emit("mensaje-servidor", mensaje)
    })
} ))

httpServer.listen(PORT, ()=>{
    console.log("servidor en puerto 8080")
})