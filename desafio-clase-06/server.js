const Contenedor = require("./contenedor");

const contenedor = new Contenedor("./productos.txt")

// contenedor.getById(1)
// contenedor.getAll()
// contenedor.deleteById(2)
// contenedor.deleteAll()

const express = require("express")

const app = express()

app.get("/", (req, res)=>{
    res.send("<h1>Desafio clase 06</h1>")
})

async function getProductos(){
    let productos = await contenedor.getAll()
    return productos
}

app.get("/productos", (req, res)=>{ 
    let productos = getProductos()
    console.log(productos)
    res.send(productos)
})

app.get("/productoRandom", (req, res)=>{
    res.send("<h1>Producto Random</h1>")
})

const PORT = 8080

const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

server.on("error", err=>console.log(err))