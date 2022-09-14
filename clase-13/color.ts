class Color{
    constructor(color) {
        this.color = color
    }
    colorRandom() {
        randomNumber = Math.floor(Math.random() * 256);
        randomColor = [randomNumber,randomNumber,randomNumber]
        console.log(randomColor)
    }
}

const myColor = new Color
console.log(myColor)