const http = require("http")

const server = http.createServer((peticion, respuesta)=>{
    const hora = new Date().getHours()
    if (6<= hora && hora <=12) {
        respuesta.end("<h1>Buen dia</h1>")
    }
    else if (13 <= hora && hora <= 19) {
        respuesta.end("<h1>Buenas tardes</h1>")
    }
    
})

const createdServer = server.listen(8080, ()=>{
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})