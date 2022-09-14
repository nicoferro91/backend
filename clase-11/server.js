const express = require("express")
const {Server: HttpServer} = require("http")
const {Server: IOServer} = require("socket.io")

const app = express()
const httpServer = new HttpServer(app)
const ioServer = new IOServer(httpServer)

app.use(express.static("public"))

app.get("/", (req,res)=>{
    res.sendFile("index.html",{root:__dirname})
})

ioServer.on("connection",socket=>{
    console.log("usuario conectado", socket.id)
    socket.emit("mensaje-server", "hola cliente")

    socket.on("disconnect",()=>{
        console.log("usuario desconectado", socket.id)
    })
})

httpServer.listen(3000, ()=>{
    console.log("servidor en puerto 3000")
})