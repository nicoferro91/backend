const optionsMariaDB = {
    client: "mysql",
    connection: {
        host: "localhost",
        // host: "127.0.0.1", la otra forma
        user: "root",
        password: "",
        database: "mibase"
    }
}

module.exports = {
    optionsMariaDB
}