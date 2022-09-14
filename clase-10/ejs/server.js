const express = require("express")
const app = express()

app.use("/static", express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.set("views", "./views")
app.set("view engine", "ejs")

app.get("/", (req, res)=>{
    let productos = [
        {nombre: "Producto1", precio:1000},
        {nombre: "Producto2", precio:2000},
        {nombre: "Producto3", precio:3000}
    ]
    res.render("pages/index",{
        mensaje: "Hola mundo con ejs",
        productos: productos

    })
})

app.post("/productos", (req, res)=>{
    const obj = req.body
    console.log(obj)
    res.render("pages/index",{
        mensaje: "Hola EJS",
        productos
    })
})


const PORT = 8080
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`))
