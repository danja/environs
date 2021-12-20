/* life.js
 *
 * Quick & Dirty implementation of Conway's Game of Life
 * using HTML <canvas>
 *
 * https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 */

const delay = 1 // mS between generations

const width = 400 // is also in HTML
const height = 400

// initial state taken from an image
var image = new Image()
image.src = 'media/logo-invert.png'

// uses 2 canvasses
var canvas = document.getElementById('canvas')
var canvasHidden = document.getElementById('hidden')

var context = canvas.getContext('2d')
var contextHidden = canvasHidden.getContext('2d')

var imageData = context.getImageData(0, 0, width - 1, height - 1)
var imageDataHidden = contextHidden.getImageData(0, 0, width - 1, height - 1)

// main algorithm
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
    } else {
      return 0
    }
  }
  if (centre == 0) {
    if (sum == 3) {
      return 1
    } else {
      return 0
    }
  }
}

// step through points on grid
// calculate values from hidden canvas
// place in main canvas
function calculateGrid () {
  for (let i = 1; i < width - 2; i++) {
    // var line = '' // debugging
    for (let j = 1; j < height - 2; j++) {
      let newVal = calculateCell(imageDataHidden.data, i, j)
      // line = line + newVal
      setState(imageData.data, i, j, newVal)
    }
    // console.log(line)
  }
  context.putImageData(imageData, 0, 0)
}

function loadSides (targetData) {
  const north = 0
  const south = 0
  const east = 0
  const west = 0

  var x = 0
  for (let y = 0; y < height; y++) {
    // do west to binary here
    setState(targetData, 0, y, 0)
  }

  x = 399
  for (let y = 0; y < height; y++) {
    // do east to binary here
    setState(targetData, width - 1, y, 0)
  }

  var y = 0
  for (let x = 0; x < width; x++) {
    // do north to binary here
    setState(targetData, x, 0, 0)
  }

  y = 399
  for (let x = 0; x < width; x++) {
    // do south to binary here
    setState(targetData, x, height - 1, 0)
  }
  // contextHidden.putImageData(imageDataHidden, 0, 0)
}

// copies one canvas's data to another
function copy (source, sink, sinkContext) {
  for (let i = 0; i < width - 1; i++) {
    for (let j = 0; j < height - 1; j++) {
      let newVal = getState(source.data, i, j)
      setState(sink.data, i, j, newVal) // newVal
    }
  }
  sinkContext.putImageData(sink, 0, 0)
}

// randomly nobbles some of the cells
// (solid areas from original image die out immediately)
function grey () {
  for (let i = 0; i < width - 1; i++) {
    for (let j = 0; j < height - 1; j++) {
      let val = getState(imageData.data, i, j)
      if (val == 1) {
        setState(imageData.data, i, j, Math.floor(Math.random() * 2)) // newVal
      }
    }
  }
  context.putImageData(imageData, 0, 0)
}

// canvas data is an array of RGBA values
// this maps to x,y flattens to 1 bit
function getState (data, x, y) {
  let pos = 4 * (x + y * height)
  let sum = data[pos] + data[pos + 1] + data[pos + 2] // R+G+B
  if (sum < 384) {
    // black-ish is alive, 1
    return 1
  }
  return 0
}

// takes one bit at x,y
// maps to canvas 1D array
function setState (data, x, y, alive) {
  let pos = 4 * (x + y * height)
  if (alive == 0) {
    data[pos] = 255 // R
    data[pos + 1] = 255 // G
    data[pos + 2] = 255 // B
    return
  }
  data[pos] = 0
  data[pos + 1] = 0
  data[pos + 2] = 0
}

// poking around for debugging
function testStates () {
  for (let i = 1; i < width - 2; i++) {
    let val = getState(imageData.data, i, 100)
    setState(imageDataHidden.data, i, 100, 1)
  }
  context.putImageData(imageData, 0, 0)
  contextHidden.putImageData(imageDataHidden, 0, 0)
}

// main loop
function generation () {
  copy(imageData, imageDataHidden, contextHidden)
  context.clearRect(0, 0, 400, 400)
  calculateGrid()
}

// wait until image has loaded before doing stuff
image.addEventListener(
  'load',
  function () {
    context.drawImage(image, 0, 0)
    contextHidden.drawImage(image, 0, 0) /////
    imageData = context.getImageData(0, 0, width - 1, height - 1)
    imageDataHidden = contextHidden.getImageData(0, 0, width - 1, height - 1)

    loadSides(imageData.data)
    context.putImageData(imageData, 0, 0)

    grey()

    //  testStates()

    setInterval(generation, delay) // delay in mS
  },
  false
)
