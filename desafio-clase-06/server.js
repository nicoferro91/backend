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

// Mostrar todos los productos
async function getProductos(){
    let productos = await contenedor.getAll()
    return productos
}

app.get("/productos", async (req, res)=>{ 
        let productos = await getProductos()
        res.send(productos)
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

// Mostrar producto random
app.get("/productoRandom", async (req, res)=>{
    let productos = await getProductos()
    let idRandom = getRandomInt(productos.length) 
    console.log(idRandom)
    res.send(productos[idRandom])
})

const PORT = 8080

const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

server.on("error", err=>console.log(err))