const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const db = require('./database/database')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


db.on('error', (error)=> console.log(error))
db.once('open', ()=> console.log('conected'))

//Rutas
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const productsRouter = require('./routes/products')
const providersRouter = require('./routes/providers')
const categoriesRouter = require('./routes/categories')
const discountsRouter = require('./routes/discounts')


app.use('/', indexRouter)
app.use('/api/users', usersRouter)
app.use("/api/products", productsRouter)
app.use("/api/categories", categoriesRouter)
app.use("/api/products", productsRouter)
app.use("/api/providers", providersRouter)
app.use("/api/discounts", discountsRouter)



// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// route middlewares
app.get('/', (req, res) => {
  res.json({
      estado: true,
      mensaje: 'works'
  })
});


// iniciar server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`servidor andando en: ${PORT}`)
})


module.exports = app
