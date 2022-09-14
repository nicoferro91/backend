// const mensajeCliente = document.getElementById("mensajeCliente")
// const envioMensaje = document.getElementById("enviarMensaje")

// console.log(mensajeCliente.value)

const socket = io()

socket.on("mensaje-server", data=>{
    console.log(data)
})

envioMensaje.addEventListener("click",()=>{
    socket.emit(mensajeCliente.value)
    // console.log(mensajeCliente.value)
})