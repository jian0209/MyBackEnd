var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
// var usersRouter = require('./routes/users');

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', indexRouter)
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

var isValid = function (s) {
  if (s.length < 1) {
    return false
  }
  let arr = s.split('')
  let returnArr = []
  arr.forEach((item) => {
    console.log(item)
    switch (item) {
      case '(':
        returnArr.push('(')
        break
      case '{':
        returnArr.push('{')
        break
      case '[':
        returnArr.push('[')
        break
      case ')':
        if (returnArr.indexOf('(') !== -1) {
          returnArr.splice(returnArr.indexOf('('), 1)
        } else {
          returnArr.push(')')
        }
        break
      case '}':
        if (returnArr.indexOf('{') !== -1) {
          returnArr.splice(returnArr.indexOf('{'), 1)
        } else {
          returnArr.push('}')
        }
        break
      case ']':
        if (returnArr.indexOf('[') !== -1) {
          returnArr.splice(returnArr.indexOf('['), 1)
        } else {
          returnArr.push(']')
        }
        break
    }
  })
  console.log(returnArr)
  if (returnArr.length < 1) {
    return true
  } else {
    return false
  }
}

console.log(isValid('([)]'))

module.exports = app
