const fs = require("fs")

fs.readFile("./package.json", "utf-8", (err,contenido) =>
{
    let objArchivo = {
        contenidoStr: "contenido",
        contenidoObj: JSON.parse(contenido),
        size: contenido.length
    }
    if(err) {
        console.log(err)
    } else {
        console.log(objArchivo.contenidoStr)
        console.log(objArchivo.contenidoObj)
    }

    fs.writeFile("./prueba.txt", JSON.stringify(objArchivo, null, 2), "utf-8", (err,contenido)=>
    {
        if(err) {
            console.log(err)
        } else {
            console.log(contenido)
        }
    })
})