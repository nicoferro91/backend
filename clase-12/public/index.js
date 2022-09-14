const server = io().connect()

const render = (productos) => {
    let listado = document.getElementById("listado")
    let html = productos.map(prod => {
        return `<li>Nombre: ${prod.nombre}, Precio: ${prod.precio}</li>`
    })
    listado.innerHTML = html.join(" ")
}

const addProduct = (evt) => {
    const nombre = document.getElementById("nombre").value
    const precio = document.getElementById("precio").value

    const producto = {nombre, precio}
    // console.log(producto)
    server.emit("producto-nuevo", producto)
    return false
}

server.on("mensaje-servidor", mensaje=>{
    // console.log("mensaje-servidor:", mensaje)
    render(mensaje.productos)
})