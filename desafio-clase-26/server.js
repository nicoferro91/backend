const express = require("express");
require("dotenv").config();
const handlebars = require("express-handlebars");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const cp = require("cookie-parser");

const app = express();

// --- WEBSOCKET
const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IoServer(httpServer);

// --- middleware ----------------
app.use(cp());
const { generadorProductos } = require("./utils/generadorProducto");
const checkAuthentication = require("./utils/checkAuthentication");
const passport = require("./utils/passportMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT;

// meter productosRandom en la base datos, en la colección productos
const productosRandoms = generadorProductos();
const { Carrito, Producto, Login, Chat } = require("./daos/index.js");

// --- Creación de objetos con DAOS ----------------
const Carritos = new Carrito();
let Productos = new Producto();

const Logins = new Login();
const Chats = new Chat();

app.set("view engine", "hbs");
app.set("views", "./views/layouts");

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
app.use(passport.initialize());
app.use(passport.session());

// página de inicio, no dejar si no está logeado
app.get("/", checkAuthentication, async (req, res) => {
	const productos = await Productos.getAll();
	res.render("index", { productos });
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
		failureRedirect: "faillogin"
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
		failureRedirect: "failregister",
		successRedirect: "/login"
	}),
	(req, res) => {
		const user = req.user
		res.redirect("/")
	}
)

// Error de registro
app.get("/failregister", (req, res) => {
	console.error("Error de registro")
	res.render("failregister")
});

// Error de login
app.get("/faillogin", (req, res) => {
	console.error("Error de login")
	res.render("faillogin")
});

// Logout
app.get("/logout", async (req, res) => {
	req.logOut()
	res.render("index")
})


// Ruta inexistente
app.use("/api/*", (req, res) => {
	res.json({
		error: -2,
		descripcion: `ruta '${req.path}' método '${req.method}' no implementada`
	})
})

httpServer.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`)
})