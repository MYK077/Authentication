const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')
const session =  require('express-session')
const bodyparser = require('body-parser')

const app = express();

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

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server has started on port ${PORT}`))
