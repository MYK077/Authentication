const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')
const session =  require('express-session')
const bodyparser = require('body-parser')

const app = express();

// passport config
require('./config/passport')(passport)

// DB Config
const db = require('./config/keys').mongoURI;
//Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// express body-parser
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));

// express-session
app.use(session({
  secret: 'meowmeowkitty',
  resave: true,
  saveUninitialized: true,
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// set global variables
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server has started on port ${PORT}`))
