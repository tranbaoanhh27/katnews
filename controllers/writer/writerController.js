const controllers = {}
const models = require('../../models');
controllers.showLoginPage = (req, res) => {
    const writerId = req.user;
    if (writerId) {
        res.redirect("/listNews")
    } else {
        res.render('writer-login', { layout: 'writer-login-layout', messageWriterAuth: req.flash('messageWriterLogin'), messageWriterSignupSuccess: req.flash('messageWriterSignupSuccess') });
    }
}
controllers.showRegisterPage = (req, res) => {
    res.render('writer-register', { layout: 'writer-login-layout', messageWriterSignup: req.flash("messageWriterSignup") });
}
controllers.showOtpPage = (req, res) => {
    res.render('writer-otp', { layout: 'writer-login-layout' })
}
controllers.showForgotPasswordPage = (req, res) => {
    res.render('writer-forgotPassword', { layout: 'writer-login-layout' })
}
controllers.showListNews = async (req, res) => {
    const writerId = req.user;
    console.log("writerId", writerId)

    const listNews = await models.NewsStatus.findAll({
        attributes:['id','status', 'updatedAt'],
        include: [{
            model: models.News,
            require: true,
            attributes: ['id', 'title', 'briefContent', 'tinyImagePath', 'writerId', 'createdAt'],
            where: {writerId: writerId}
        }
        ],
        order: [['id', "DESC"]]
    })
    console.log(listNews)
    res.render('writer-list-news', { layout: 'writer-news-layout', listNews });
}
controllers.showEditPage = (req, res) => {
    res.render('writer-edit', { layout: 'writer-news-layout' })
}
controllers.showInformationPage = (req, res) => {
    res.render('writer-information', { layout: 'writer-news-layout' })
}
controllers.showChangePasswordPage = (req, res) => {
    res.render('writer-changePassword', { layout: 'writer-news-layout' })
}
controllers.showSavedNews = (req, res) => {
    res.render('writer-savedNews', { layout: 'writer-news-layout' })
}
module.exports = controllers