const width = 400 // is also in HTML
const height = 400

var image = new Image()
image.src = 'media/logo-invert.png'

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

var canvasHidden = document.getElementById('hidden')
var contextHidden = canvasHidden.getContext('2d')

var imageDataHidden = contextHidden.getImageData(0, 0, width - 1, height - 1)

function loadImage () {
  context.drawImage(image, 0, 0)
}

function draw () {
  var imageData = context.getImageData(0, 0, width - 1, height - 1)
  // Iterate through every pixel
  for (let i = 0; i < imageData.data.length; i += 4) {
    imageDataHidden.data[i + 0] = 255 - imageData.data[i + 0] // R
    imageDataHidden.data[i + 1] = 255 - imageData.data[i + 1] // G
    imageDataHidden.data[i + 2] = 255 - imageData.data[i + 2] // B
    imageDataHidden.data[i + 3] = imageData.data[i + 3] // Alpha
  }

  contextHidden.putImageData(imageDataHidden, 0, 0)
}

function calculateCell (data, i, j) {
  let a = getState(data, i - 1, j - 1)
  let b = getState(data, i, j - 1)
  let c = getState(data, i + 1, j - 1)
  let d = getState(data, i - 1, j)
  let centre = getState(data, i, j)
  let e = getState(data, i + 1, j)
  let f = getState(data, i - 1, j + 1)
  let g = getState(data, i, j + 1)
  let h = getState(data, i + 1, j + 1)
  sum = a + b + c + d + e + f + g + h
  if (centre == 1) {
    if (sum == 2 || sum == 3) {
      return 1
    }
  }
  if (centre == 0) {
    if (sum == 3) {
      return 1
    }
  }
  return 0
}

function copy (source, sink, sinkContext) {
  for (let i = 1; i < width - 2; i++) {
    for (let j = 1; j < height - 2; j++) {
      let newVal = getState(source.data, i, j)
      setState(sink.data, i, j, newVal) // newVal
    }
  }
  sinkContext.putImageData(sink, 0, 0)
}

function calculateGrid () {
  var imageData = context.getImageData(0, 0, width - 1, height - 1)
  var imageDataHidden = contextHidden.getImageData(0, 0, width - 1, height - 1)

  for (let i = 1; i < width - 2; i++) {
    for (let j = 1; j < height - 2; j++) {
      let newVal = calculateCell(imageData.data, i, j)
      // console.log(newVal)
      setState(imageDataHidden.data, i, j, 0) //newVal
    }
  }
  contextHidden.putImageData(imageDataHidden, 0, 0)
}

function getState (data, x, y) {
  let pos = 4 * (x + y * height)
  let sum = data[pos] + data[pos + 1] + data[pos + 2] // R+G+B
  if (sum < 384) {
    // black-ish is alive, 1
    return 1
  }
  return 0
}

function setState (data, x, y, alive) {
  let pos = 4 * (x + y * height)
  if (alive == 0) {
    data[pos] = 255
    data[pos + 1] = 255
    data[pos + 2] = 255
    return
  }
  data[pos] = 0
  data[pos + 1] = 0
  data[pos + 2] = 0
}

function testStates () {
  var imageData = context.getImageData(0, 0, width - 1, height - 1)
  var imageDataHidden = contextHidden.getImageData(0, 0, width - 1, height - 1)
  for (let i = 1; i < width - 2; i++) {
    // setState(imageData.data, i, 100, 0)
    //  setState(imageDataHidden.data, i, 100, 0)
    let val = getState(imageData.data, i, 100)

    setState(imageDataHidden.data, i, 100, val)
  }
  context.putImageData(imageData, 0, 0)
  contextHidden.putImageData(imageDataHidden, 0, 0)
}

image.addEventListener(
  'load',
  function () {
    loadImage()
    draw()
    //   testStates()
    // calculateGrid()
    var imageData = context.getImageData(0, 0, width - 1, height - 1)
    var imageDataHidden = contextHidden.getImageData(
      0,
      0,
      width - 1,
      height - 1
    )

    copy(imageData, imageDataHidden, contextHidden)
  },
  false
)
