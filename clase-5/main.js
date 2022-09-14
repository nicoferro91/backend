// Crea 1000 numeros random y los guarda en un objeto sumando las veces de cada uno
// let obj = {}
// const agregar = (nro) => {
//     if(typeof obj[nro] === "undefined") {
//         obj[nro] = 1
//     } else {
//         obj[nro] += 1 
//     }
// }
// for(let i=0; i<1000; i++) {
//     const numero = Math.ceil(Math.random()*20)
//     agregar(numero)
// }
// console.log(obj)


// const productos = [
//     { id:1, nombre:'Escuadra', precio:323.45 },
//     { id:2, nombre:'Calculadora', precio:234.56 },
//     { id:3, nombre:'Globo Terráqueo', precio:45.67 },
//     { id:4, nombre:'Paleta Pintura', precio:456.78 },
//     { id:5, nombre:'Reloj', precio:67.89 },
//     { id:6, nombre:'Agenda', precio:78.90 }
// ]

// let nombres = []

// for(let i=0; i<5 ; i++) {
//     nombres[i]=productos[i].nombre
// }

// let total 

// console.log(nombres)

const moment = require("moment")

const fecha = moment().format('L');
console.log(fecha)