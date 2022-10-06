const { normalize, denormalize, schema } = require("normalizr");
const fs = require("fs");
const mensajesSinNormalizar = require("./mensajesSinNormalizar.json");

// **-- Mensajes --**
const messages = mensajesSinNormalizar;

// normalizr de messages
const authorSchema = new schema.Entity("author", {}, { idAttribute: "id" });
const commentSchema = new schema.Entity("text");
const messageSchema = [
	{
		author: authorSchema,
		text: commentSchema
	}
];

const normalizedMessages = normalize(messages, messageSchema);

fs.writeFileSync(
	"./ecommerce/chat.json",
	JSON.stringify(normalizedMessages.result)
);
