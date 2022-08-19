// socket.on("mensaje-server", data=>{
//     console.log(data)
// })

// const prodName = document.querySelector("#nombre")
// const prodPrice = document.querySelector("#precio")
// const prodThumb = document.querySelector("#foto")
// const prodAdd = document.querySelector("#agregar")

// prodAdd.addEventListener("click", ()=>{
//     socket.emit("nuevo-producto-cliente", {"title":prodName, "price":prodPrice, "thumbnail":prodThumb, "id": 5})
// })

const socket = io().connect()
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

socket.on("mensaje-server", mensaje => {
    const newMsg = document.createElement("p")
    newMsg.innerText = mensaje
    chatContainer.appendChild(newMsg)
})