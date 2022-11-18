const admin = require("firebase-admin");
const serviceAccount = require("../db/ecommerce-backend-8bbf1-firebase-adminsdk-80ph9-1bf3dbee18.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

class ContenedorFirebase {
	constructor(coll) {
		this.coll = coll;
		this.connection();
		this.query = db.collection(coll);
	}

	async connection() {
		console.log("Firebase: base de datos conectada");
	}

    // Devolver todos los productos
	async getAll() {
		try {
			let querySnapshot = await this.query.get();
			let docs = querySnapshot.docs;
			let newData = docs.map(doc => ({
				...doc.data(),
				id: doc.id
			}));
			return newData;
		} catch (error) {
			console.log(`Error al listar: ${error}`);
			return [];
		}
	}

	// Devolver un producto por id
	async getById(id) {
		try {
			let data = await this.query.doc(id).get();
			let newData = { ...data.data(), id: data.id }
			return newData
		} catch (error) {
			return `No se pudo traer producto ${id}. ${error}`;
		}
	}

    // Actualizar un producto por id
    async updateById(product) {
		try {
			await this.query.doc(product.id).update(product)
			return product.id
		} catch (error) {
			console.log(`Error al actualizar: ${error}`)
		}
	}

    // Agregar un producto
	async save(product) {
		try {
			let newSave = await this.query.add(product)
			return newSave.id;
		} catch (error) {
			console.log(`Error al guardar: ${error}`)
		}
	}

    // Borrar un producto por id
	async deleteById(id) {
		try {
			let data = await this.query.doc(id).delete()
			return data;
		} catch (error) {
			console.log(`Error al eliminar: ${error}`)
		}
	}
}

module.exports = ContenedorFirebase;