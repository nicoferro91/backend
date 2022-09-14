const express = require("express")

const app = express()

let count = 0

app.get("/", (req, res)=>{
    res.send("Bienvenido al servidor express")
})

app.get("/visitas", (req, res)=>{
    count ++
    res.send(`Visitas: ${count}`)
})

const PORT = 4000

const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

server.on("error", err=>console.log(err))