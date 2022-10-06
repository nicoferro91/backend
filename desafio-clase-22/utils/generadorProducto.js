const { faker } = require("@faker-js/faker");

class Producto {
	constructor(id, title, price, thumbnail) {
		this.id = id;
		this.title = title;
		this.price = price;
		this.thumbnail = thumbnail;
	}
}
// genera 5 productos random y los mete en array producto
generadorProductos = () => {
	const productos = [];
	for (let i = 0; i < 5; i++) {
		const producto = new Producto(
			faker.random.numeric(),
			faker.commerce.productName(),
			faker.commerce.price(100, 200, 0),
			faker.image.imageUrl()
		);
		productos.push(producto);
	}
	return productos;
};
module.exports = { generadorProductos };