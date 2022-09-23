const socket = io().connect()

// Enviar producto nuevo
const addProduct = ()=>{
    const prodName = document.querySelector("#nombre")
    const prodPrice = document.querySelector("#precio")
    const prodThumb = document.querySelector("#foto")
    const newProduct = {"title": prodName.value,
                        "price": prodPrice.value,
                        "thumbnail": prodThumb.value}
    socket.emit("newProduct-client", newProduct)
}
// Recibir producto nuevo
socket.on("newProduct-server", product => {
    const tableBody = document.querySelector("#tableBody")
    const newRow = document.createElement("tr")
    const newName = document.createElement("td")
    newName.innerHTML = product.title
    newRow.appendChild(newName)
    const newPrice = document.createElement("td")
    newPrice.innerHTML = product.price
    newRow.appendChild(newPrice)
    const newThumb = document.createElement("td")
    newThumb.innerHTML = product.thumbnail
    newRow.appendChild(newThumb)
    tableBody.appendChild(newRow)
})

// Enviar mensaje
const chatContainer = document.querySelector("#chatContainer")
const chatSubmit = document.querySelector("#chatSubmit")
let email = 0;
const enviarEmail = () => {
    email = document.querySelector("#email").value
}
const enviarMensaje = () => {
    if(email){
        const date = formatDate(new Date())
        const chatMsg = document.querySelector("#chatMsg")
        socket.emit("mensaje-cliente", `${email} [${date}]: ${chatMsg.value}`)
    }
}
const formatDate = (date) => {
    day = [
      date.getDate(),
      date.getMonth(),
      date.getFullYear(),
    ].join('/')
    const time = date.toLocaleTimeString()
    return myDate = day+" - "+time 
  }
// Recibir mensaje
socket.on("mensaje-server", mensaje => {
    const newMsg = document.createElement("p")
    newMsg.innerText = mensaje
    chatContainer.appendChild(newMsg)
})