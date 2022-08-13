const Contenedor= require("./contenedor");
const handlebars = require("express-handlebars")

const express = require("express")
const { Router } = express

const app = express()
const PORT = 8080
const routerProductos = Router()

// Funciones middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static("public"))

app.use("/", routerProductos)

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

// Mostrar formulario de ingreso
app.get("/", (req,res)=>{
    res.render("partials/formulario",{productList:false, agregado:false})
})

// Mostrar tabla de productos
app.get("/productos", async (req, res)=>{
    const contenedor = new Contenedor("./productos.txt")
    let productos = await contenedor.getAll()
    res.render("partials/productos", {productList:true, agregado:false, products:productos})
})

// Agregar un producto
routerProductos.post("/", (req, res)=>{
    const contenedor = new Contenedor("./productos.txt")
    const objProducto = req.body
    console.log(req.body)
    contenedor.save(objProducto)
    res.render("partials/formulario",{productList:false, agregado:true})
})

app.listen(PORT, err => {
    if(err) throw new Error("error en server")
    console.log(`servidor en puerto ${PORT}`)
})
