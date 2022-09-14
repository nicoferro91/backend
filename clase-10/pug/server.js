const express = require("express")
const app = express()

app.use("/static", express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.set("views", "./views")
app.set("view engine", "pug")

app.get("/", (req, res)=>{
    res.render("index", {mensaje: "Hola mundo con pug"})
})

app.get("/datos", (req, res)=>{
    res.render("index", {mensaje: "Hola mundo con pug"})
})

const PORT = 8080
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`))
