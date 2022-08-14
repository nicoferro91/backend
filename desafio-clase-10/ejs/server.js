const Contenedor= require("./contenedor");
const express = require("express")

const app = express()
const PORT = process.env.PORT || 8080

// Seteo de EJS
app.set('view engine', 'ejs')
app.set('views', './views')

// Para que funcione req.body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mostrar index con formulario
app.get('/', (req, res) => {
    res.render('index', {mensaje: true})
})

// Mostrar tabla de productos
app.get("/productos", async (req, res)=>{
    const contenedor = new Contenedor("./productos.txt")
    let productos = await contenedor.getAll()
    res.render("productos", {productList:true, agregado:false, products:productos})
})

// Agregar un producto
app.post("/", (req, res)=>{
    const contenedor = new Contenedor("./productos.txt")
    console.log(contenedor)
    console.log(req.body)
    const objProducto = req.body
    console.log(objProducto)
    contenedor.save(objProducto)
    res.render("index",{productList:false, agregado:true})
})

app.listen(PORT, err => {
    if(err) console.log(err)
    else console.log(`servidor en puerto ${PORT}`)
})
