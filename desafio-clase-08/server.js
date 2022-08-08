const Contenedor= require("./contenedor");
// const contenedor = new Contenedor("./productos.txt")

const express = require("express")
const { Router } = express

const app = express()
const PORT = 8080
const routerProductos = Router()

// Funciones middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static("public"))

app.use("/api/productos", routerProductos)

app.get("/", (req,res) =>{
    res.send("hola mundo")
})

app.listen(PORT, () =>{
    console.log("servidor en puerto 8080")
})

// Devolver un producto por id
routerProductos.get("/:id", async (req,res)=>{
    const {id} = req.params
    const contenedor = new Contenedor("./productos.txt")
    let productos = await contenedor.getById(id)
    res.send(productos)
})

// Devolver todos los productos
routerProductos.get("/", async (req,res)=>{
    const contenedor = new Contenedor("./productos.txt")
    let productos = await contenedor.getAll()
    res.send(productos)
})

// Actualizar un producto
routerProductos.put("/:id", async(req, res)=>{
    const {id} = req.params
    const objProducto = req.body
    const contenedor = new Contenedor("./productos.txt")
    const respuesta = await contenedor.updateById(objProducto)
    res.json({respuesta})
} )

// Agregar un producto
routerProductos.post("/", (req, res)=>{
    const contenedor = new Contenedor("./productos.txt")
    const objProducto = req.body
    contenedor.save(objProducto)
    res.json({
        msg: "producto guardaro",
        objProducto
    })
})



