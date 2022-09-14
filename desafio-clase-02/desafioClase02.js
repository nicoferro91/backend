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
    addPet(pet) {
        this.mascotas.push(pet)
    }
    countPets() {
        const petNumber = this.mascotas.length
        console.log(`Las mascotas son ${petNumber}`)
    }
    addBook(titulo, autor) {
        this.libros.push({nombre: titulo, autor: autor})
    }
    getBookNames() {
        const bookNames = []
        this.libros.forEach(book=> bookNames.push(book.nombre)) 
        console.log("los libros son " +bookNames)
    }
}

const usuario = new Usuario("nico", "ferro", {nombre: "got", autor: "rr martin"}, "perro")

usuario.getFullName()
usuario.addPet("gato")
usuario.countPets()
usuario.addBook()
usuario.getBookNames()
console.log(usuario)