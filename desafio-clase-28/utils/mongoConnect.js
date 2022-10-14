const mongoose = require("mongoose")

const mongoConnect = async () => {
	try {
		const url =
			"mongodb+srv://nicoferro91:nicoferro1234@cluster0.jupxsy4.mongodb.net/?retryWrites=true&w=majority"
		mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log("MongoDb conectado")
	} catch (error) {
		console.error(`error de conexion: ${error}`)
	}
};

module.exports = mongoConnect;