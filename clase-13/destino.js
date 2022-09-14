"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Color = /*#__PURE__*/function () {
  function Color(color) {
    _classCallCheck(this, Color);

    this.color = color;
  }

  _createClass(Color, [{
    key: "colorRandom",
    value: function colorRandom() {
      randomNumber = Math.floor(Math.random() * 256);
      randomColor = [randomNumber, randomNumber, randomNumber];
      console.log(randomColor);
    }
  }]);

  return Color;
}();

var myColor = new Color();
