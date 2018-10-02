const express = require ('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

//import route
const users = require('./route/api/users');
const posts = require('./route/api/posts');
const profile = require('./route/api/profile');


const app = express();

//Body parser middleware

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.
    connect(db).
    then(() => console.log('MongoDB connected')).
    catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());

// Passport config

require('./config/passport')(passport);


// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);






const port = process.env.PORT || 5000;
// if port no exits, create a port on localhost: 5000

app.listen(port, () => console.log(`Server running on port ${port}`));