var Color = /** @class */ (function () {
    function Color(color) {
        this.color = color;
    }
    Color.prototype.colorRandom = function () {
        randomNumber = Math.floor(Math.random() * 256);
        randomColor = [randomNumber, randomNumber, randomNumber];
        console.log(randomColor);
    };
    return Color;
}());
var myColor = new Color;
console.log(myColor);
