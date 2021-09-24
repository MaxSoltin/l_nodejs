const express = require('express')
const nunjucks = require('nunjucks')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const postRouters = require('./routes/post-routes')
const postApiRouters = require('./routes/api-post-routes')
const contactRouters = require('./routes/contact-router')
const createPath = require('./helpers/create-path')
require('dotenv').config()

const app = express()

const env = nunjucks.configure('views', {
  autoescape: true,
  express: app
});

env.addFilter('formatDate', function(date) {
  return date.toLocaleDateString()
});

mongoose
  .connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((res) => {console.log('Connected to DB')})
  .catch((error) => {console.log(error)})

app.listen(process.env.PORT, error => {
  error ? console.log(error) : console.log(`listening port ${PORT}`)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.urlencoded({extended: false}))

app.use(express.static('styles'))

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  const title = 'Home'
  res.render(createPath('index'), {title})
})

app.use(postRouters)
app.use(contactRouters)
app.use(postApiRouters)

app.use((req, res) => {
  const title = 'Error page'
  res
    .status(404)
    .render(createPath('error'), {title})
})