const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const multer = require('multer')
const port = 3000
const { response } = require('express')
const fs = require('fs')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });

// app code 

app.get('/', (req, res) => {
  fs.readdir(path, function(err, items) {
   let newImage = items.map(img => `<img src='/uploads/${img}' width='250px' >`)
   console.log(newImage);
   res.send(`<h1>Welcome to Kenziegram!</h1>
   <form action="/upload" method="POST" enctype="multipart/form-data">
   <input type="file" name="myImage" />
   <input type="submit" name="submit" />
 </form>
 
 <div id="home"> `
    + newImage.join("") + 
    "</div>"
    
    ) 
    
  });

})
app.post('/upload', upload.single('myImage'), (req, res) => {
  res.send(`<img id="images" width='250px' src="/uploads/${req.file.filename}">
  <body> 
      SUCCESS!
      
      <input action="action"onclick="window.history.go(-1); return false;" type="submit"value="Back"/>    
  
  </body>`
  );
  console.log(req.body)
  response.end('success');
});

app.use(function (err, req, res, next) {
  if (err instanceof multer.MulterError) res.status(500).send(err.message);
  else next(err);
});

app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})






module.exports = app;
