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

app.use("/api/productos", routerProductos)

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



app.get("/", (req, res)=>{
    res.render("main", {listExist: true, list: fakeApi() })
})

app.listen(PORT, err => {
    if(err) throw new Error("error en server")
    console.log(`servidor en puerto ${PORT}`)
})
