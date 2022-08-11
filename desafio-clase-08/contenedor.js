const fs = require("fs")

class Contenedor {
    constructor(route) {
        this.route = route
    }
    async updateById(product, id) {
        try {
            let data = await fs.promises.readFile(this.route, "utf8")
            let dataParse = JSON.parse(data)
            const productIndex = dataParse.findIndex(prod => prod.id === id)
            // const productIndex = dataParse.findIndex(prod => prod.id === product.id)
            if(productIndex!== -1){
                product.id = id
                dataParse[productIndex] = product
                await fs.promises.writeFile(this.route, JSON.stringify(dataParse, null, 2))
                return {msg: `producto actualizado id:${id}`}
                // return {msg: `producto actualizado id:${product.id}`}
            } else {
                return { error : 'producto no encontrado' }
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getById(id) {
        try {
            let data = await fs.promises.readFile(this.route, "utf8")
            let dataParse = JSON.parse(data)
            id = parseInt(id)
            let product = dataParse.find(product => product.id === id)
            if (product) {
                return product
            } else {
                console.log("El producto no existe getById")
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getAll() {
        try {
            let data = await fs.promises.readFile(this.route, "utf8")
            let dataParse = await JSON.parse(data)
            if (dataParse.length) {
                // console.log(dataParse)
                return Promise.resolve(dataParse)
            } else {
                console.log("No hay productos")
            }
        } catch (error) {
            console.log(error)
        }
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
    async deleteById(id) {
        console.log("intentando borrar")
        try {
            let data = await fs.promises.readFile(this.route, "utf8")
            let dataParse = JSON.parse(data)
            let product = dataParse.find(product => product.id === id)
            if (product) {
                let dataParseFilter = dataParse.filter(product=>product.id !== id )
                await fs.promises.writeFile(this.route, JSON.stringify(dataParseFilter, null, 2))
                console.log(`El producto ${product.id} fue borrado`)
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
            console.log(error)
        }
    }
}
module.exports = Contenedor