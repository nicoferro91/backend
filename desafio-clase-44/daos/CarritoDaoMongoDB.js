const ContenedorMongodb = require("../contenedores/ContenedorMongodb.js")
const mongoose = require("mongoose")
const { mongoConnect } = require("../utils/mongoconnect.js")

const carritosCollection = "carritos"

const CarritosSchema = new mongoose.Schema({
	title: { type: String, require: true },
	thumbnail: { type: String, require: true },
	price: { type: Number, require: true },
	stock: { type: Number, require: true }
})

const carritos = mongoose.model(carritosCollection, CarritosSchema)

class CarritoDaoMongoDb extends ContenedorMongodb {
	constructor() {
		super(mongoConnect, carritos)
	}
}

module.exports = CarritoDaoMongoDb