/**
 * @author: Jerry Zou
 * @email: jerry.zry@outlook.com
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  var Image = (function () {
    function Image(imageData) {
      _classCallCheck(this, Image);

      this.data = imageData.data.slice(0);
      this.w = imageData.width;
      this.h = imageData.height;
    }

    _createClass(Image, [{
      key: 'get',
      value: function get(x, y) {
        var base = this.w * y + x;
        return [this.data[base], this.data[base + 1], this.data[base + 2], this.data[base + 3]];
      }
    }, {
      key: 'toGrayscale',
      value: function toGrayscale() {
        for (var i = 0; i < this.data.length; i += 4) {
          var avg = (this.data[i] + this.data[i + 1] + this.data[i + 2]) / 3;
          this.data[i] = this.data[i + 1] = this.data[i + 2] = avg;
        }
      }
    }, {
      key: 'toImageData',
      value: function toImageData() {
        return new ImageData(new Uint8ClampedArray(this.data), this.w, this.h);
      }
    }]);

    return Image;
  })();

  var Sobel = (function () {
    function Sobel(imageData) {
      _classCallCheck(this, Sobel);

      var image = this.image = new Image(imageData);
      image.toGrayscale();

      var operatorX = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
      var operatorY = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];

      //function mult(operator, x, y) {
      //  return (operator[0][0] * image.get(x-1, y-1)
      //    + operator[0][1] * image.get(x-1, y)
      //    + operator[0][2] * image.get(x-1, y+1)
      //    + operator[1][0] * image.get(x-1, y)
      //    + operator[1][1] * image.get(x-1, y)
      //    + operator[1][2] * image.get(x-1, y)
      //    + operator[2][0] * image.get(x-1, y+1)
      //    + operator[2][1] * image.get(x-1, y+1)
      //    + operator[2][2] * image.get(x-1, y+1))
      //}
    }

    _createClass(Sobel, [{
      key: 'getResultArray',
      value: function getResultArray() {}
    }, {
      key: 'renderResult',
      value: function renderResult(canvas) {
        var ctx = canvas.getContext('2d');
        ctx.putImageData(this.image.toImageData(), 0, 0);
      }
    }]);

    return Sobel;
  })();

  window.Sobel = Sobel;
})();
