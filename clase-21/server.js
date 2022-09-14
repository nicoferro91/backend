const express = require("express")
const app = express()
const PORT = 8080

app.get("/test", async (req,res)=>{
    const contenedor = new Contenedor(knexSQLite,"misMensajes")
    const respuesta = await contenedor.getMessages()
    res.json({respuesta})
})

httpServer.listen(PORT, err => {
    if(err) throw new Error("error en server")
    console.log(`servidor en puerto ${PORT}`)
})