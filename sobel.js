/**
 * @author: Jerry Zou
 * @email: jerry.zry@outlook.com
 */

(function(){
  class MyImage {
    constructor(imageData) {
      this.data = imageData.data
      if (!imageData.fake) this.data = this.data.slice(0)
      this.w = imageData.width
      this.h = imageData.height
    }

    pixel(x, y, value) {
      let base = (this.w * y + x) * 4
      if (!value) {
        return [
          this.data[base],
          this.data[base + 1],
          this.data[base + 2],
          this.data[base + 3]
        ]
      } else {
        for (let i = 0; i < 4; i++) {
          this.data[base + i] = value[i]
        }
      }
    }

    grayscale() {
      let grayscaleData = []
      for (let i = 0; i < this.data.length; i+= 4) {
        let avg = (this.data[i] + this.data[i+1] + this.data[i+2]) / 3
        grayscaleData[i] = grayscaleData[i+1] = grayscaleData[i+2] = avg
        grayscaleData[i+3] = 255
      }
      return new MyImage({
        fake: true,
        data: grayscaleData,
        width: this.w,
        height: this.h
      })
    }

    imageData() {
      return new ImageData(new Uint8ClampedArray(this.data), this.w, this.h)
    }
  }

  function sobel(imageData) {
    const begin = Date.now()
    let image = (new MyImage(imageData)).grayscale()
    let edgeData = new MyImage({
      fake: true,
      data: [],
      width: image.w,
      height: image.h
    })

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

    function multiple(operator, x, y) {
      return (
        operator[0][0] * image.pixel(x-1, y-1)[0] +
        operator[0][1] * image.pixel(x,   y-1)[0] +
        operator[0][2] * image.pixel(x+1, y-1)[0] +
        operator[1][0] * image.pixel(x-1, y)[0]   +
        operator[1][1] * image.pixel(x,   y)[0]   +
        operator[1][2] * image.pixel(x+1, y)[0]   +
        operator[2][0] * image.pixel(x-1, y+1)[0] +
        operator[2][1] * image.pixel(x,   y+1)[0] +
        operator[2][2] * image.pixel(x+1, y+1)[0]
      )
    }

    for (let y = 0; y < image.h; y++) {
      for (let x = 0; x < image.w; x++) {
        let Gx = multiple(operatorX, x, y)
        let Gy = multiple(operatorY, x, y)
        let result = Math.sqrt(Gx*Gx + Gy*Gy)
        edgeData.pixel(x, y, [result, result, result, 255])
      }
    }

    console.log(`Sobel takes: ${Date.now() - begin} ms`)

    return edgeData
  }

  window.sobel = sobel
}())
