const Contenedor = require("./contenedor");

const contenedor = new Contenedor("./productos.txt")

contenedor.save({title: "Holanda2", price: 3000, 
thumbnail: "https://firebasestorage.googleapis.com/v0/b/moin-di.appspot.com/o/cartera3.jpg?alt=media&token=121a81df-44d9-4d30-89d0-aea6ad7e754e"})

contenedor.getById(1)

contenedor.getAll()

contenedor.deleteById(2)

contenedor.deleteAll()