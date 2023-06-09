'use strict'

const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const models = require('../../models');
const bcrypt = require('bcrypt');
const controllers = {};

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


controllers.showEditPage = async (req, res) => {
    const category = await models.SubCategory.findAll({
        attributes: ['id', 'name']
    });
    res.render('writer-edit', { layout: 'writer-news-layout', createSuccess: req.flash('createSuccess'), createFail: req.flash('createFail'), category: category });
}

controllers.createNews = async (req, res) => {
    let linkimages = [];
    try {
        const images = req.files;
        const news = req.body;
        const writerId = req.user;
        if (images.length < 2) {
            throw "Phải đăng dủ hình đại diện và hình nền"
        }
        if (!writerId) {
            throw "Bạn chưa đăng nhập"
        }

        for (let image of images) {
            const name = image.originalname.split('.')[0];
            const ext = image.originalname.split('.')[1];
            const filename = `news-image/${name}_${Date.now()}.${ext}`;

            await uploadBytes(ref(firebaseStorage, filename), image.buffer, { contentType: image.mimetype }).then(
                async (snapshot) => {
                    await getDownloadURL(snapshot.ref).then(
                        (downloadURL) => {
                            linkimages.push(downloadURL);
                            console.log(`File uploaded to Firebase Storage. Download URL: ${downloadURL}`);
                        }
                    )
                }
            )
        }

        const newData = {
            ...news,
            tinyImagePath: linkimages[0],
            largeImagePath: linkimages[1],
            isDraft: true,
            isPremium: false,
            totalViewsCount: 0,
            weeklyViewsCount: 0,
            writerId: writerId
        };

        await models.sequelize.transaction(async (t) => {
            // insert news
            const newNews = await models.News.create(newData);
            if (!newNews) {
                throw "Không thể thêm bài viết mới"
            }

            // insert tags
            const tags = news.tag.trim().split(",");
            for (let tagName of tags) {
                tagName = tagName.trim();
                if (tagName.length == 0) continue;
                let newTag = await models.Tag.findOne({ where: { name: tagName } });
                if (!newTag) {
                    newTag = await models.Tag.create({ name: tagName });
                }
                newNews.addTag(newTag);
            }

            // insert status
            const newsStatus = await models.NewsStatus.create({
                status: "unconfirm",
                publishDate: Date.now(),
                newsId: newNews.id
            })
            if (!newsStatus) {
                throw "Không cập nhật được trạng thái của bài viết bạn vừa đăng"
            }
        });
        req.flash('createSuccess', 'Tạo bài viết thành công')
        res.redirect('/edit');
    }
    catch (err) {
        req.flash('createFail', err)
        res.redirect('/edit');
    }
}

controllers.changePassword = async (req, res) => {
    try {
        const writerId = req.user;
        if (!writerId) throw "Bạn chưa đăng nhập"
        const writer = await models.Writer.findOne({ where: { id: writerId } });
        if (!writer) throw "Writer không tồn tại"
        if (!bcrypt.compareSync(req.body.oldPassword, writer.password)) {
            throw "mật khẩu không khớp";
        }
        const newHashPassword = await bcrypt.hashSync(req.body.newPassword, 8);
        const updateWriter = await models.Writer.update({ password: newHashPassword }, { where: { id: writerId } });
        if (updateWriter) {
            req.flash('writerSuccessChangePassword', "Đổi mật khẩu thành công");
            res.redirect('/changePassword');
        } else {
            throw "Không thể đổi mật khẩu"
        }
    } catch (err) {
        req.flash('writerErrorChangePassword', err);
        res.redirect('/changePassword');
    }

}

controllers.showUpdateNews = async (req, res) => {
    try {
        const newsId = req.params.id;
        const writerId = req.user;
        const news = await models.News.findOne({ where: { id: newsId } });
        const status = await models.NewsStatus.findOne({ where: { newsId: newsId } });
        const category = await models.SubCategory.findAll({ attributes: ['id', 'name'] });
        if (!news) {
            res.redirect('/listNews');
        }
        else if (writerId !== news.writerId || !status || status.status == 'approved') { // check writer is valid
            res.redirect('/listNews');
        }
        else {
            const tag = await models.Tag.findAll({
                attributes: ['name'],
                include: [{
                    model: models.News,
                    where: { id: newsId }
                }]
            })

            let tagName = tag.reduce((res, cur) => {
                return res + cur.name + ', ';
            }, '');

            news.tag = tagName.trim().slice(0, -1);
            news.categoryId = Number(news.categoryId)
            console.log('news', news)
            res.render('writer-edit', { layout: 'writer-news-layout', news: news, category: category, createFail: req.flash('createFail') });
        }
    } catch (err) {
        res.redirect('/listNews');
    }
}


controllers.updateNews = async (req, res) => {
    const newsId = req.params.id;
    const writerId = req.user;
    const news = await models.News.findOne({ where: { id: newsId }, include: [{ model: models.Tag }] });
    const status = await models.NewsStatus.findOne({ where: { newsId: newsId } });
    if (!news) {
        res.redirect('/listNews');
    }
    else if (writerId !== news.writerId || !status || status.status == "approved") { // check writer is valid
        res.redirect('/listNews');
    }
    else {
        let linkimages = [];
        try {
            const images = req.files;
            if (images.length == 1) {
                req.flash('createFail', 'Bạn cần phải nhập đủ 2 hình nền và đại diện');
                res.redirect(`/edit/news/${newsId}`);
            }
            for (let image of images) {
                const name = image.originalname.split('.')[0];
                const ext = image.originalname.split('.')[1];
                const filename = `news-image/${name}_${Date.now()}.${ext}`;
                await uploadBytes(ref(firebaseStorage, filename), image.buffer, { contentType: image.mimetype }).then(
                    async (snapshot) => {
                        await getDownloadURL(snapshot.ref).then(
                            (downloadURL) => {
                                linkimages.push(downloadURL);
                            }
                        )
                    }
                )
            }
            const tag = req.body.tag.trim();
            delete req.body.tag;

            const updateNews = {
                ...req.body,
            }
            if (linkimages.length == 2) {
                Object.assign(updateNews, { tinyImagePath: linkimages[0], largeImagePath: linkimages[1] });
            }

            await models.sequelize.transaction(async (t) => {
                // update news
                const newNews = await models.News.update(updateNews, {
                    where: { id: newsId }
                })

                // remove tags
                const tagsRemove = await models.Tag.findAll({
                    include: [{
                        model: models.News,
                        where: { id: newsId }
                    }]
                })
                for (let tag of tagsRemove) {
                    news.removeTag(tag);
                }

                // update status
                const newsStatus = await models.NewsStatus.update({
                    status: "unconfirm",
                    publishDate: Date.now()
                }, { where: { newsId: newsId } });

                const tags = tag.split(",");
                for (let tagName of tags) {
                    tagName = tagName.trim();
                    if (tagName.length == 0) continue;
                    let newTag;
                    newTag = await models.Tag.findOne({ where: { name: tagName } });
                    console.log('tag', newTag);
                    if (!newTag) {
                        newTag = await models.Tag.create({ name: tagName });
                    }
                    news.addTag(newTag);
                }
            });

            res.redirect('/listNews');
        } catch (err) {
            res.redirect('/listNews');
        }
    }
}

module.exports = controllers;