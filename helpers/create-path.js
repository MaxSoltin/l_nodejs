const path = require('path')

const createPath = page => path.resolve(__dirname, '../views', `${page}.njk`)

module.exports = createPath