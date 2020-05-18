const passport = require ('passport');

module.exports = (app) => {
    //google authentication route
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    //google callback url
    app.get('/auth/google/callback', passport.authenticate('google'));
    //test authentication by checking current user is signed in
    app.get('/api/current_user', (req, res)=>{
        res.send(req.user)
    });
    //log a user out and dump cookie using passport
    app.get('/api/logout', (req, res)=>{
        req.logout();
        res.send(req.user);
    });

}


