const passport = require ('passport');
const GoogleStrategy = require ('passport-google-oauth20').Strategy;
const keys = require ('../config/keys');
const mongoose = require ('mongoose');

//import users schema from mongoose
const User = mongoose.model('users');

//tell passport to generate a cookie
passport.serializeUser((user, done)=> {
    done(null, user.id)
});
//take this cookie and put it back into the user model
passport.deserializeUser((id, done)=>{
    User.findById(id).then(user=>{done(null, user)});
});

//tell passport to use google strategy
passport.use(new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
},
    (accessToken, refreshToken, profile, done)=> {
        //check if user already exists first
        User.findOne({googleId: profile.id}).then(existingUser=> {
            if (existingUser) {
                done(null, existingUser);
            } else {
                //create a new user with googleid set to the id we get back from google on profile id
                new User({googleId: profile.id}).save().then(user=> done (null, user));
            }
        })

        
    }
));