require("dotenv").config()

const CarritoDaoMongoDB = require("./CarritoDaoMongoDB.js")
const ProductoDaoMongoDB = require("./ProductoDaoMongoDB.js")
const LoginDaoMongoDB = require("./LoginDaoMongoDB.js")
const ChatDaoFirebase = require("./ChatDaoFirebase.js")

// Exports
exports.Carrito = CarritoDaoMongoDB
exports.Producto = ProductoDaoMongoDB
exports.Login = LoginDaoMongoDB
exports.Chat = ChatDaoFirebase