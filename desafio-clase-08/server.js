const Contenedor= require("./contenedor");

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
    let {id} = req.params
    id = id.slice(1)
    id = parseInt(id)
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
    let {id} = req.params
    id = id.slice(1)
    id = parseInt(id)
    const objProducto = req.body
    const contenedor = new Contenedor("./productos.txt")
    const respuesta = await contenedor.updateById(objProducto, id)
    res.json({respuesta})
} )

// Agregar un producto
routerProductos.post("/", (req, res)=>{
    const contenedor = new Contenedor("./productos.txt")
    const objProducto = req.body
    contenedor.save(objProducto)
    res.json({
        msg: "producto guardado",
        objProducto
    })
})

// Borrar un producto por id
routerProductos.delete("/:id", async (req,res)=>{
    let {id} = req.params
    id = id.slice(1)
    id = parseInt(id)
    const contenedor = new Contenedor("./productos.txt")
    let productos = await contenedor.deleteById(id)
    if(productos){
        res.send(`El producto ${productos.id} fue borrado`)
    }
    else{
        res.send("El producto no existe")
    }
})