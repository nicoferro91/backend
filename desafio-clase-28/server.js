const express = require("express")
require("dotenv").config()
const handlebars = require("express-handlebars")
const MongoStore = require("connect-mongo")
const session = require("express-session")
const cp = require("cookie-parser")

const { argv, platform, version, memoryUsage, cwd, pid, execPath } = process
const { fork } = require("child_process")
const calculoPesado = require("./utils/calculo")

const app = express();

// --- WEBSOCKET
const { Server: HttpServer } = require("http")
const { Server: IoServer } = require("socket.io")
const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)

// --- middleware ----------------
app.use(cp())
const { generadorProductos } = require("./utils/generadorProducto")
const checkAuthentication = require("./utils/checkAuthentication")
const passport = require("./utils/passportMiddleware")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

const PORT = process.env.PORT;

// meter productosRandom en la base datos, en la colección productos
const productosRandoms = generadorProductos()
const { Carrito, Producto, Login, Chat } = require("./daos/index.js")

// --- Creación de objetos con DAOS ----------------
const Carritos = new Carrito()
let Productos = new Producto()

const Logins = new Login()
const Chats = new Chat()

app.set("view engine", "hbs")
app.set("views", "./views/layouts")

app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		defaultLayout: "",
		layoutsDir: "",
		partialsDir: __dirname + "/views/partials"
	})
)

app.use(
	session({
		store: MongoStore.create({
			mongoUrl:
				"mongodb+srv://nicoferro91:nicoferro1234@cluster0.jupxsy4.mongodb.net/?retryWrites=true&w=majority",
			mongoOptions: {
				useNewUrlParser: true,
				useUnifiedTopology: true
			}
		}),
		secret: "secreto",
		resave: false,
		rolling: true,
		cookie: {
			htppOnly: false,
			secure: false,
			maxAge: 90000
		},
		rolling: true,
		resave: true,
		saveUninitialized: false
	})
);

// Passport
app.use(passport.initialize())
app.use(passport.session())

// página de inicio, no dejar si no está logeado
app.get("/", checkAuthentication, async (req, res) => {
	const productos = await Productos.getAll()
	res.render("index", { productos })
});

// Login
app.get("/login", (req, res) => {
	if (req.isAuthenticated()) {
		let user = req.user
		console.log("usuario logueado")
		res.render("index")
	} else {
		console.log("user no logueado")
		res.render("login")
	}
})

app.post(
	"/login",
	passport.authenticate("login", {
		successRedirect: "/",
		failureRedirect: "loginFail"
	}),

	(req, res) => {
		const { user } = req.user
		res.redirect("/")
	}
)


// Registro
app.get("/register", (req, res) => {
	res.render("register")
});

app.post(
	"/register",
	passport.authenticate("register", {
		failureRedirect: "registerFail",
		successRedirect: "/login"
	}),
	(req, res) => {
		const user = req.user
		res.redirect("/")
	}
)

// Error de registro
app.get("/registerFail", (req, res) => {
	console.error("Error de registro")
	res.render("registerFail")
});

// Error de login
app.get("/loginFail", (req, res) => {
	console.error("Error de login")
	res.render("loginFail")
});

// Logout
app.get("/logout", async (req, res) => {
	req.logOut()
	res.render("index")
})

// Ruta inexistente ------ tengo que arreglar esto

// app.use("/api/*", (req, res) => {
// 	res.json({
// 		error: -2,
// 		descripcion: `ruta '${req.path}' método '${req.method}' no implementada`
// 	})
// })

// Info
app.get("/info", (req, res) => {
	const arguments = argv.slice(2).join(" || ");

	res.render("info", {
		execArgv: arguments.length ? arguments : "Ninguno",
		platform,
		version,
		memoryUsage: memoryUsage().rss,
		cwd: cwd(),
		pid,
		execPath
	});
});

// Numeros aleatorios
app.get("/api/randoms", (req, res) => {
	let { cant } = req.query
	console.log(cant)
	const random = fork("./utils/calculo", [cant])
	random.send("start")
	random.on("message", obj => {
		res.json(obj)
	})
})

httpServer.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`)
})