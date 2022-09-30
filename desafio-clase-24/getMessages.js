
const { optionsSQLite } = require("./sqlite3/conexionSQLite")
const knexSQLite = require("knex")(optionsSQLite)

const getMessages = () => {
    knexSQLite.from("misMensajes").select("*")
        .then(resp => console.log("log adentro", resp))
        .catch((error)=>console.log(error))
        .finally(()=>knexSQLite.destroy())
}

const messages = getMessages()
console.log("log afuera",messages)