/* Node.js static file web server */

// dependencies
const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

const config = require('./config.js')

http
  .createServer((request, response) => {
    const { method, url } = request
    console.log(method)
    console.log(url)

    // provide index at root
    if (url === '/') {
      doIndex(response)
      return
    }

    let pathname = path.join(__dirname, url)

    if (!fs.existsSync(pathname)) {
      response.statusCode = 404
      response.end(`File ${pathname} not found.`)
      return
    }

    if (method == 'GET') {
      doGet(pathname, response)
      return
    }
    if (method == 'PUT') {
      doPut(request, response, pathname)
      return
    }
  })
  .listen(config.port)

function doIndex (response) {
  var fileList = '<ul>'
  response.setHeader('Content-type', 'text/html')
  var files = fs.readdirSync('.' + config.fileDir) // + )
  files.forEach(element => {
    if (fs.statSync('.' + config.fileDir + element).isFile()) {
      fileList += `<br/><li><a href='${config.fileDir + element}'>
                  ${element}
              </a></li>`
    }
  })
  fileList += '</ul>'
  response.end('<h1>Resources</h1> ' + fileList)
}

function doGet (pathname, response) {
  fs.readFile(pathname, function (err, data) {
    if (err) {
      response.statusCode = 500
      response.end(`Server oopsy.`)
    } else {
      const filenameExt = path.parse(pathname).ext
      response.setHeader(
        'Content-type',
        config.mediaTypes[filenameExt] || 'text/plain'
      )
      response.end(data)
    }
  })
}

function doPut (request, response, pathname) {
  let body = []
  request
    .on('data', chunk => {
      body.push(chunk)
    })
    .on('end', () => {
      body = Buffer.concat(body).toString()
      fs.writeFileSync(pathname, body)
    })
  response.end('ok')
}

console.log(`Server listening on port ${config.port}`)
