const socket = ioServer.connect()

const prodName = document.querySelector("#nombre")
const prodPrice = document.querySelector("#precio")
const prodThumb = document.querySelector("#foto")
const prodAdd = document.querySelector("#agregar")

prodAdd.addEventListener("click", ()=>{
    socket.emit("nuevo-producto-cliente", {"title":prodName, "price":prodPrice, "thumbnail":prodThumb, "id": 5})
})