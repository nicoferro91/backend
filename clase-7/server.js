const express = require("express")

const app = express()

app.get("/api/usuarios",(req,res)=> {
    res.json(
        [
            {
                id: 1,
                nombre: "juan1"
            },
            {
                id: 2,
                nombre: "juan2"
            },
            {
                id: 3,
                nombre: "juan3"
            },
        ]
    )
})