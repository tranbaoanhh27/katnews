const controllers = {}
const models = require('../../models');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytes } = require('firebase/storage')

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
}

const firebase = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(firebase);

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

controllers.showListNews = async (req, res) => {
    const writerId = req.user;
    const page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));
    const NEWS_LIMIT = 10;
    const newsOffset = NEWS_LIMIT * (page - 1);
    const {rows, count} = await models.NewsStatus.findAndCountAll({
        attributes: ['id', 'status', 'updatedAt'],
        include: [{
            model: models.News,
            require: true,
            attributes: ['id', 'title', 'abstract', 'tinyImagePath', 'writerId', 'createdAt'],
            where: { writerId: writerId }
        }
        ],
        order: [['status', 'DESC'], ['id', "DESC"]],
        limit: NEWS_LIMIT,
        offset: newsOffset,
    }) 
    res.render('writer-list-news', { layout: 'writer-news-layout', listNews: rows, pagination: { page: page, limit: NEWS_LIMIT, totalRows: count, queryParams: req.params } });

}

controllers.showInformationPage = async (req, res) => {
    const writerId = req.user;
    const writer = await models.Writer.findOne({ where: { id: writerId } });
    res.render('writer-information', { layout: 'writer-news-layout', writer: writer })
}

controllers.showChangePasswordPage = async (req, res) => {
    const writerId = req.user;
    const writer = await models.Writer.findOne({ where: { id: writerId } });
    res.render('writer-changePassword', {
        layout: 'writer-news-layout',
        writer: writer,
        writerErrorChangePassword: req.flash('writerErrorChangePassword'),
        writerSuccessChangePassword: req.flash('writerSuccessChangePassword')
    })
}


controllers.editInformation = async (req, res) => {
    const writerId = req.user;
    try {
        await models.Writer.update({
            fullName: req.body.fullName,
            pseudonym: req.body.pseudonym
        },
            {
                where: { id: writerId }
            })
        res.redirect('/information');
    } catch (err) {
        res.redirect('/information');
    }

}

controllers.editAvatar = async (req, res) => {
    const writerId = req.user;
    try {
        const file = req.file;
        const name = file.originalname.split('.')[0];
        const type = file.originalname.split('.')[1];
        const filename = `writer-avatar-images/${name}_${Date.now()}.${type}`;
        await uploadBytes(ref(firebaseStorage, filename), file.buffer, { contentType: file.mimetype }).then(
            async (snapshot) => {
                await getDownloadURL(snapshot.ref).then(
                    async (downloadUrl) => {
                        console.log(downloadUrl)
                        await models.Writer.update({
                            avatarPath: downloadUrl
                        },
                            {
                                where: { id: writerId }
                            })

                    }
                )
            }
        )
        res.redirect('/information');
    }
    catch (err) {
        console.log(err)
        res.redirect('/information');
    }
}

module.exports = controllers