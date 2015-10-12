# sobel-es6

Sobel Algorithm in ES6. [DEMO](http://zry656565.github.io/sobel-es6/examples/)

[![NPM](https://nodei.co/npm/sobel-es6.png)](https://nodei.co/npm/sobel-es6)

# Install

```
npm install sobel-es6
```

or just include the JS file: `build/sobel.js`

# Usage

```javascript
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    image = new Image()

image.src = "../images/cherry.png"
image.onload = function() {
    var w = canvas.width = image.width,
        h = canvas.height = image.height

    ctx.drawImage(image, 0, 0)
    var result = sobel(ctx.getImageData(0, 0, w, h))
    ctx.putImageData(result.imageData(), 0, 0)
}
```

# Contribute

### Environment

```
npm install -g babel
```

### Development

The command below will compile the JS file as long as it is modified.

```
npm start
```

### build

```
npm run build
```

