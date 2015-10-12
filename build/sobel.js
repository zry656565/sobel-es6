/**
 * @author: Jerry Zou
 * @email: jerry.zry@outlook.com
 */

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var MyImage = (function () {
    function MyImage(imageData) {
      _classCallCheck(this, MyImage);

      this.data = imageData.data;
      if (!imageData.fake) this.data = this.data.slice(0);
      this.w = imageData.width;
      this.h = imageData.height;
    }

    _createClass(MyImage, [{
      key: "pixel",
      value: function pixel(x, y, value) {
        var base = (this.w * y + x) * 4;
        if (!value) {
          return [this.data[base], this.data[base + 1], this.data[base + 2], this.data[base + 3]];
        } else {
          for (var i = 0; i < 4; i++) {
            this.data[base + i] = value[i];
          }
        }
      }
    }, {
      key: "grayscale",
      value: function grayscale() {
        var grayscaleData = [];
        for (var i = 0; i < this.data.length; i += 4) {
          var avg = (this.data[i] + this.data[i + 1] + this.data[i + 2]) / 3;
          grayscaleData[i] = grayscaleData[i + 1] = grayscaleData[i + 2] = avg;
          grayscaleData[i + 3] = 255;
        }
        return new MyImage({
          fake: true,
          data: grayscaleData,
          width: this.w,
          height: this.h
        });
      }
    }, {
      key: "imageData",
      value: function imageData() {
        return new ImageData(new Uint8ClampedArray(this.data), this.w, this.h);
      }
    }]);

    return MyImage;
  })();

  function sobel(imageData) {
    var begin = Date.now();
    var image = new MyImage(imageData).grayscale();
    var edgeData = new MyImage({
      fake: true,
      data: [],
      width: image.w,
      height: image.h
    });

    var operatorX = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
    var operatorY = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];

    function multiple(operator, x, y) {
      return operator[0][0] * image.pixel(x - 1, y - 1)[0] + operator[0][1] * image.pixel(x, y - 1)[0] + operator[0][2] * image.pixel(x + 1, y - 1)[0] + operator[1][0] * image.pixel(x - 1, y)[0] + operator[1][1] * image.pixel(x, y)[0] + operator[1][2] * image.pixel(x + 1, y)[0] + operator[2][0] * image.pixel(x - 1, y + 1)[0] + operator[2][1] * image.pixel(x, y + 1)[0] + operator[2][2] * image.pixel(x + 1, y + 1)[0];
    }

    for (var y = 0; y < image.h; y++) {
      for (var x = 0; x < image.w; x++) {
        var Gx = multiple(operatorX, x, y);
        var Gy = multiple(operatorY, x, y);
        var result = Math.sqrt(Gx * Gx + Gy * Gy);
        edgeData.pixel(x, y, [result, result, result, 255]);
      }
    }

    console.log("Sobel takes: " + (Date.now() - begin) + " ms");

    return edgeData;
  }

  window.sobel = sobel;
})();
