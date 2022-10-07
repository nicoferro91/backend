const express = require("express");
const session = require("express-session");
const { createClient } = require("redis");
const connectRedis = require("connect-redis");
const dotenv = require("dotenv").config();

const handlebars = require("express-handlebars");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars
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


const redisStore = connectRedis(session);
const redisClient = createClient({
	socket: {
		host: "redis-16907.c93.us-east-1-3.ec2.cloud.redislabs.com",
		port: 16907
	},
	password: "6IiNNTWU1RsiSRksKItfGmQMHIm7vF9d",
	legacyMode: true
});
redisClient.on("error", function (err) {
	console.log(`Redis error: ${err} no se puede conectar`);
});
redisClient.on("connect", function (ok) {
	console.log(`Redis conectado`);
});
redisClient.connect();
// Middleware
app.use(
	session({
		store: new redisStore({ client: redisClient }),
		secret: "secret",
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false,
			httpOnly: false
		}
	})
);
app.get("/", (req, res) => {
	const sess = req.session
	if (sess.username && sess.password) {
		res.write(`<h1>Bievenido ${sess.username} </h1><br>`)
		res.end("<a href=" + "/logout" + ">Cerrar Sesion</a >")
	} else {
		var currentPath = process.cwd()

		res.render(currentPath + "/views/layouts/login.hbs")
	}
})

app.post("/login", async (req, res) => {
	const sess = req.session
	const { username, password } = req.body
	sess.username = username
	sess.password = password

	await res.redirect("/")
});
app.get("/logout", (req, res) => {
	req.session.destroy(err => {
		if (err) {
			return console.log(err);
		}
		res.redirect("/")
	});
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`escuchando el puerto ${PORT}`)
});
