const passport = require('passport');
const LocalStrategy = require('passport-local');
const models = require('../../models');

// hàm này được gọi nếu xác thực thành công, và lưu thông tin user vào session
passport.serializeUser((user, done) => {
    done(null, user);
})

// hàm này được gọi bởi passport.session() giúp ta lấy giữ liệu user trong session và gắn vào req.user
passport.deserializeUser((user, done)=> {
    done(null, user);
})

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


