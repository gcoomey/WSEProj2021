var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/getManagerData', function (req, res) {
   
   
  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');
   // set up a connection  
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });
  
  
   
// hold the data that we going to send back.
var output = '';


  con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT orderby, items FROM orders;", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
   
    
    // looping over the records
    for(var i=0; i< result.length; i++){
        output = output + result[i].orderby + '---' + result[i].items + '<br>';
    }
    
     // return the output variable
    res.send(output);   
  });
});


  
  
});


app.post('/checkTheLogin', function (req, res) {
   
   // catching the variables
  var username = req.body.username;  
  var pass = req.body.password;
   
  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');
   // set up a connection  
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });
  
  
  con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM users WHERE username = '"+username+"' AND PASSWORD = '"+pass+"' LIMIT 1;", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
	//return the acccount type back
    res.send(result[0].acctype);
    
  });
});

   
   
   
   
});



app.post('/putInDatabase', function (req, res) {
  
  // catching the variables
  var username = req.body.username;
  var email = req.body.email;
  var pass = req.body.password;
  
  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');

  
 // set up a connection  
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });
  
  
  con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO `test`.`users` (`username`, `email`, `password`, `acctype`) VALUES ('"+username+"', '"+email+"', '"+pass+"', '"+acctype+"');";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
  res.send('Data went to the database');
  
  
})




app.post('/completeCheckout', function (req, res) {
  
  // catching the variables
  var orderby = req.body.orderby;
  var items = req.body.items;
   
  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');

  
 // set up a connection  
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });
  
  
  con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO `test`.`orders` (`orderby`, `items`) VALUES ('"+orderby+"', '"+items+"');";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
  res.send('Data went to the database');
  
  
})

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

module.exports = app;
