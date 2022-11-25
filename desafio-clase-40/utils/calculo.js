function calculo() {
	let obj = {};
	let nro = "";
	let cant = 100000000;
	if (process.argv[2] !== "undefined") {
		cant = process.argv[2]
	}

	for (let i = 0; i < cant; i++) {
		nro = Math.floor(Math.random() * 1000 + 1)
		if (obj[nro]) {
			obj[nro] = ++obj[nro]
		} else {
			obj[nro] = 1
		}
	}
	return obj;
}

process.on("message", function (message) {
	process.send(calculo())
});