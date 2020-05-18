const express = require ('express');
const mongoose = require ('mongoose');
const cookieSession = require('cookie-session');
const passport = require ('passport');
//import keys 
const keys = require ('./config/keys');
//import mongoose models - this needs to be BEFORE importing passport setup
require ('./models/User');
//import passport setup
require ('./services/passport');

//connect mongoose with mongouri
mongoose.connect(keys.mongoURI);

const app = express ();

//tell passport to make use of cookies
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
)
app.use(
    passport.initialize()
);
app.use(
    passport.session()
);


//import auth routes
require ('./routes/authRoutes')(app);

app.get('/', (req, res)=>{
    res.send('hi');
})


const PORT = process.env.PORT || 5000;
app.listen (PORT);
