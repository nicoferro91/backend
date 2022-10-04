const { Contenedor } = require("./utils/contenedor");
const { generadorProductos } = require("./utils/generadorProducto");
const exec = require("child_process").exec;

const express = require("express");
const handlebars = require("express-handlebars");

const productosRandoms = generadorProductos();
const leerComentarios = new Contenedor("./ecommerce/chat.json");
const guardarComentarios = new Contenedor(
	"./ecommerce/mensajesSinNormalizar.json"
);

const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IoServer(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 8080;

// ** Mensajes----------------
// ----------------------------INICIO
io.on("connection", async socket => {
	let mensajesChat = await leerComentarios.getAll();
	console.log("Se contectó un usuario");

	const text = {
		text: "ok",
		mensajesChat
	};

	socket.emit("mensaje-servidor", text);

	socket.on("mensaje-nuevo", async (msg, cb) => {
		mensajesChat.push(msg);
		const text = {
			text: "mensaje nuevo",
			mensajesChat
		};

		io.sockets.emit("mensaje-servidor", text);
		await guardarComentarios.save({
			author: msg.author,
			text: msg.text
		});
		exec("node ./ecommerce/mensajes.js", async (err, stdout, stderr) => {
			if (err !== null) {
				console.error(`error de exec: ${err}`);
			}
			return (mensajesChat = await leerComentarios.getAll());
		});
	});
});
// ---------------------------- FIN

// -------------------------------- INICIO Mensajes cambios por json.
app.get("/api/mensajes/:id", async (req, res) => {
	const { id } = req.params;
	const productoById = await productos.getById(id);
	productoById
		? res.json(productoById)
		: res.json({ error: "Producto no encontrado" });
});

app.put("/api/mensajes/:id", async (req, res) => {
	const { id } = req.params;
	const respuesta = await guardarComentarios.updateById(id, req.body);
	res.json(respuesta);
	exec("node ./ecommerce/mensajes.js", async (err, stdout, stderr) => {
		if (err !== null) {
			console.error(`error de exec: ${err}`);
		}
		return (texts = await leerComentarios.getAll());
	});
});

app.delete("/api/mensajes/:id", async (req, res) => {
	const { id } = req.params;
	res.json(await guardarComentarios.deleteById(id));
	exec("node ./ecommerce/mensajes.js", async (err, stdout, stderr) => {
		if (err !== null) {
			console.error(`error de exec: ${err}`);
		}
		return (texts = await leerComentarios.getAll());
	});
});

app.delete("/api/texts", async (req, res) => {
	res.json(await guardarComentarios.deleteAll());
	exec("node ./ecommerce/mensajes.js", async (err, stdout, stderr) => {
		if (err !== null) {
			console.error(`error de exec: ${err}`);
		}
		return (texts = await leerComentarios.getAll());
	});
});
// -------------------------------- FIN Mensajes cambios por json.

// ** Render con handlebars
// ------------------------------ INICIO
app.set("view engine", "hbs");
app.set("views", "./views/layouts");

app.use(express.static("public"));

app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		defaultLayout: "",
		layoutsDir: "",
		partialsDir: __dirname + "/views/partials"
	})
);
// ---------------------------- FIN

// ** Productos
// ------------------------------ INICIO
app.get("/api/productos-test", async (req, res) => {
	const producto = await productosRandoms;
	res.render("productos", {
		list: producto,
		listExist: true,
		producto: true
	});
});

app.get("/", async (req, res) => {
	const producto = await productosRandoms;
	res.render("index", {
		titulo: "Productos de Crud",
		list: producto,
		listExist: true,
		producto: true
	});
});
// ---------------------------- FIN

httpServer.listen(port, err => {
	if (err) throw new Error(`Error al iniciar el servidor: ${err}`);
	console.log(`Server is running on port ${port}`);
});
