const fs = require("fs")

async function leerArch() {
    try {
        const contenido = await fs.promise.readFile("./prueba.txt", "utf-8")
        console.log(contenido)
    } catch (error) {
        console.log(error)
    }
}

leerArch()