const passport = require('passport');
const LocalStrategy = require('passport-local');
const models = require('../../models');
passport.use(new LocalStrategy(
    {
        usernameField: "email",
        passwordField: 'password',
    },
    async function verify(email, password, cb){
    const user = await models.Writer.findOne({where: {email}});
    console.log('user', user)
    if (!user) {
        return cb(null, false, {message: "Username does not exist"});
    }
    if (password != user.password) {
        return cb(null, false, {message: "Password is incorrect"});
    }
    console.log("sucess")
    return cb(null, user);
}))

module.exports = passport;


