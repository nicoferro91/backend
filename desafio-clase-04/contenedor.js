const fs = require("fs")

class Contenedor {
    constructor(route) {
        this.route = route
    }
    async save(product) {
        try {
            let data = await fs.promises.readFile(this.route, "utf8")
            let dataParse = JSON.parse(data)
            if (dataParse.length) {
                await fs.promises.writeFile(this.route, JSON.stringify([...dataParse, { ...product, id: dataParse.length + 1 }], null, 2))
            } else {
                await fs.promises.writeFile(this.route, JSON.stringify([{ ...product, id: 1 }], null, 2))
            }
            return dataParse.length + 1
        } catch (error) {
            console.log(error)
        }
    }
    async getById(id) {
        try {
            let data = await fs.promises.readFile(this.route, "utf8")
            let dataParse = JSON.parse(data)
            let product = dataParse.find(product => product.id === id)
            if (product) {
                // console.log(product)
                return product
            } else {
                console.log("El producto no existe")
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getAll() {
        try {
            let data = await fs.promises.readFile(this.route, "utf8")
            let dataParse = JSON.parse(data)
            if (dataParse.length) {
                console.log(dataParse)
            } else {
                console.log("No hay productos")
            }
        } catch (error) {
            console.log(error)
        }
    }
    async deleteById(id) {
        try {
            let data = await fs.promises.readFile(this.route, "utf8")
            let dataParse = JSON.parse(data)
            let product = dataParse.find(product => product.id === id)
            if (product) {
                let dataParseFilter = dataParse.filter(product=>product.id !== id )
                await fs.promises.writeFile(this.route, JSON.stringify(dataParseFilter, null, 2))
                console.log(`El producto ${id} fue borrado`)
                return product
            } else {
                console.log("El producto no existe")
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }
    async deleteAll(){
        try {
            await fs.promises.writeFile(this.route, JSON.stringify([], null, 2))
            console.log("Borrados todos los productos")
        } catch (error) {
            
        }
    }
}
module.exports = Contenedor