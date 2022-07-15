// desafio clase 02
class Usuario {
    constructor (nombre, apellido, libros , mascotas ) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = Array(libros)
        this.mascotas = Array(mascotas)
    }
    getFullName() {
        console.log(this.nombre + " " + this.apellido)
    }
    addPet() {
        this.mascotas.push("gato")
    }
    countPets() {
        const petNumber = this.mascotas.length
        console.log(`Las mascotas son ${petNumber}`)
    }
    addBook() {
        this.libros.push({nombre: "lotr", autor: "tolkien"})
    }
    getBookNames() {
        const bookNames = []
        this.libros.forEach(book=> bookNames.push(book.nombre)) 
        console.log("los libros son " +bookNames)
    }
}

const usuario = new Usuario("nico", "ferro", {nombre: "got", autor: "rr martin"}, "perro")

usuario.getFullName()
usuario.addPet()
usuario.countPets()
usuario.addBook()
usuario.getBookNames()
console.log(usuario)