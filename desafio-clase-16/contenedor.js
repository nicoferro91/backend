class Contenedor {
    constructor(knex, table) {
        this.knex = knex
        this.table = table
    }
    // Crear tabla
    async createTable(tableName) {
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
            console.log("tabla creada")
        } catch (error) {
            console.log(error)
        } finally {
            knex.destroy()
        }
    }
    // Agregar un producto
    async save(product) {
        try {
            await this.knex(this.table).insert(product)
            return { msg: "Producto agregado" }
        } catch (error) {
            console.log(`Error al agregar un producto: ${error}`)
        }
    }
    // Devolver un producto por id
    async getById(id) {
        try {
            let product = await this.knex.from(this.table).select("*").where({ id: id })
            if (product[0]) {
                return product[0]
            } else {
                console.log(`El producto id: ${id} no existe`)
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }
    // Devolver todos los productos
    async getAll() {
        try {
            const productos = await this.knex.from(this.table).select("*")
            if (productos) {
                return productos
            } else {
                return { msg: `No hay productos` }
            }
        } catch (error) {
            console.log(error)
        }
    }
    // Actualizar un producto por id
    async updateById(product, id) {
        try {
            await this.knex
                .from(this.table)
                .where({ id: id })
                .update({ ...product })
            return { msg: `Producto actualizado id:${id}` }
        } catch (error) {
            console.log(`Error al actualizar producto: ${error}`)
        }
    }
    // Borrar un producto por id
    async deleteById(id) {
        try {
            await this.knex.from(this.table).where({ id: id }).del()
            return {msg: `Producto id: ${id} borrado`}
        } catch (error) {
            console.log(`Error al borrar producto: ${error}`)
        }
    }
    // Borrar todos los productos
    async deleteAll() {
        try {
            await this.knex.from(this.table).del()
            return {msg: "Todos los productos borrados"}
        } catch (error) {
            console.log(`Error al eliminar productos: ${error}`)
        }
    }
}
module.exports = Contenedor