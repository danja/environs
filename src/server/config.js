config = {
  port: 8181,
  fileDir: '/files/'
}

// some more constants
// check https://docs.aws.amazon.com/neptune/latest/userguide/sparql-media-type-support.html

config.mediaTypes = {
  '.html': 'text/html',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'application/vnd.ms-fontobject',
  '.ttf': 'application/font-sfnt',

  '.jsonld': 'application/ld+json',
  '.ttl': 'text/turtle'
}

module.exports = config
