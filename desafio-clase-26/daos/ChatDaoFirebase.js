const ContenedorFirebase = require("../contenedores/ContenedorFirebase")

class ChatDaoFirebase extends ContenedorFirebase {
	constructor() {
		super("chat")
	}
}

module.exports = ChatDaoFirebase