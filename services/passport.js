const passport = require ('passport');
const GoogleStrategy = require ('passport-google-oauth20').Strategy;
const keys = require ('../config/keys');
const mongoose = require ('mongoose');

//import users schema from mongoose
const User = mongoose.model('users');

//tell passport to generate a cookie
passport.serializeUser((user, done)=> {
    done(null, user.id)
})
//take this cookie and put it back into the user model
passport.deserializeUser((id, done)=>{
    User.findById(id)
    .then(user=>{
        done(null, user)
    })
})

//tell passport to use google strategy
passport.use(new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
},
    async (accessToken, refreshToken, profile, done)=> {
        //check if user already exists first
        const existingUser = await User.findOne({googleId: profile.id});
        if (existingUser) {
            done(null, existingUser);
        } else {
            const user = await new User ({
                googleId: profile.id
            }).save()
            done (null, user);
        }        
    }));