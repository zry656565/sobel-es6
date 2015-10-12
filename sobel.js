/**
 * @author: Jerry Zou
 * @email: jerry.zry@outlook.com
 */

(function(){
  class Image {
    constructor(imageData) {
      this.data = imageData.data.slice(0)
      this.w = imageData.width
      this.h = imageData.height
    }

    get(x, y) {
      let base = this.w * y + x
      return [
        this.data[base],
        this.data[base + 1],
        this.data[base + 2],
        this.data[base + 3]
      ]
    }

    toGrayscale() {
      for (let i = 0; i < this.data.length; i+= 4) {
        let avg = (this.data[i] + this.data[i+1] + this.data[i+2]) / 3
        this.data[i] = this.data[i+1] = this.data[i+2] = avg
      }
    }

    toImageData() {
      return new ImageData(new Uint8ClampedArray(this.data), this.w, this.h)
    }
  }

  class Sobel {
    constructor(imageData) {
      let image = this.image = new Image(imageData)
      image.toGrayscale()

      const operatorX = [
        [-1,0,1],
        [-2,0,2],
        [-1,0,1]
      ]
      const operatorY = [
        [-1,-2,-1],
        [0,0,0],
        [1,2,1]
      ]

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

    getResultArray() {

    }

    renderResult(canvas) {
      let ctx = canvas.getContext('2d')
      ctx.putImageData(this.image.toImageData(), 0, 0)
    }
  }

  window.Sobel = Sobel
}())
