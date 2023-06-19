const passport = require('passport');
const LocalStrategy = require('passport-local');
const models = require('../../models');
const bcrypt = require('bcrypt')
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
        passReqToCallback: true,
    },
    async function verify(req, email, password, cb) {
        const user = await models.Writer.findOne({ where: { email } });
        console.log('user', user)
        if (!user) {
            return cb(null, false, req.flash('messageWriterLogin', "Tên đăng nhập không tồn tại"));
        }
        bcrypt.compare(password, user.password, (err, result) => {
            console.log("result", result)
            if (err) {
                return cb(null, false, req.flash('messageWriterLogin', "Mật khẩu không chính xác"));
            }
            if (result) {
                console.log("sucess")
                return cb(null, user);
            } else {
                return cb(null, false, req.flash('messageWriterLogin', "Mật khẩu không chính xác"));
            }
        })
    }
))

module.exports = passport;


