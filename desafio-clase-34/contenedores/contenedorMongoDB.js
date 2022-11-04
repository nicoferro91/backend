const mongoose = require("mongoose")

class ContenedorMongoDB {
	constructor(url, modelo) {
		this.url = "mongodb+srv://nicoferro91:nicoferro1234@cluster0.jupxsy4.mongodb.net/?retryWrites=true&w=majority"
		// this.url = url
		// esto genera un error, estoy pasando mal el parametro
		this.modelo = modelo
		this.connection()
	}

	async connection() {
		await mongoose.connect(this.url, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		console.log("MongoDB: base de datos conectada")
	}

    // Devolver todos los productos
	async getAll() {
		try {
			let data = await this.modelo.find({})
			let newData = data.map(el => {
				return { ...el._doc, id: el._id.toString() }
			})
			return newData
		} catch (error) {
			console.log(error)
			return []
		}
	}
    	
    // Devolver un producto por id
	async getById(id) {
		try {
			let data = await this.modelo.findOne({ _id: id })
			let newData = { ...data._doc, id: data._id.toString() }
			return newData
		} catch (error) {
			return `No se pudo traer producto ${id}. ${error}`
		}
	}

    // Actualizar un producto por id
	async updateById(product) {
		try {
			await this.modelo.updateOne({ _id: product.id }, { $set: { ...product } })
			return product.id
		} catch (error) {
			console.log(`Error al actualizar: ${error}`)
		}
	}
    
    // Agregar un producto
	async save(product) {
		try {
			let guardar = await new this.modelo(product).save()
			return guardar._id.toString()
		} catch (error) {
			console.log(`Error al guardar: ${error}`)
		}
	}

    // Borrar un producto por id
	async deleteById(id) {
		try {
			let data = await this.modelo.deleteOne({ _id: id })
			return data
		} catch (error) {
			console.log(`Error al eliminar: ${error}`)
		}
	}
}

module.exports = ContenedorMongoDB