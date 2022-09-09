// Tabla de productos
const products = [
    {
        "title": "Pullover",
        "price": 1000,
        "thumbnail": "https://cdn1.iconfinder.com/data/icons/fashion-icons-1/48/pullover-128.png",
        "id": 1
    },
    {
        "title": "Remera",
        "price": 2000,
        "thumbnail": "https://cdn1.iconfinder.com/data/icons/fashion-icons-1/48/t-shirt-128.png",
        "id": 2
    },
    {
        "title": "Vestido largo",
        "price": 3000,
        "thumbnail": "https://cdn1.iconfinder.com/data/icons/fashion-icons-1/48/night_dress-128.png",
        "id": 3
    },
    {
        "title": "Poncho",
        "price": 4000,
        "thumbnail": "https://cdn1.iconfinder.com/data/icons/fashion-icons-1/48/poncho-128.png",
        "id": 4
    }
]

const { optionsMariaDB } = require("./mariaDB/conexionMariaDB")
const knexMariaDB = require("knex")(optionsMariaDB)

const productsTable = "misProductos"

const createProductsTable = async (tableName) => {
    try {
        await knexMariaDB.schema.createTable(tableName, table => {
            table.increments("id")
            table.string("title")
            table.integer("price")
            table.string("thumbnail")
            table.string("descripcion")
            table.integer("codigo")
            table.integer("stock")
        })
        await knexMariaDB(tableName).insert(products)
        console.log("tabla de productos creada")
    } catch (error) {
        console.log(`Error creando tabla productos: ${error}`)
    } finally {
        knexMariaDB.destroy()
    }

}


// Tabla de mensajes
const messages = [
	{
		mail: "nico@gmail.com",
		msg: "buenas noches",
		date: "5/8/2022 - 21:04:14"
	},
	{
		mail: "pepe@gmail.com",
		msg: "buenas noches",
		date: "5/8/2022 - 21:04:24"
	},
	{
		mail: "manu@gmail.com",
		msg: "buenas noches",
		date: "5/8/2022 - 21:04:34"
	},
	{
		mail: "laura@gmail.com",
		msg: "buenas noches",
		date: "5/8/2022 - 21:04:44"
	}
]

const { optionsSQLite } = require("./sqlite3/conexionSQLite")
const knexSQLite3 = require("knex")(optionsSQLite)

const msgTable = "misMensajes"

const createMsgTable = async (tableName) => {
    try {
        await knexSQLite3.schema.createTable(tableName, table => {
			table.increments("id")
			table.string("mail")
			table.string("msg")
			table.varchar("date")
		})
        await knexSQLite3(tableName).insert(messages)
    } catch (error) {
        console.log(`Error creando tabla mensajes: ${error}`);
    } finally {
        knexSQLite3.destroy()
    }
    
}

// createProductsTable(productsTable)
createMsgTable(msgTable)