'use strict'

const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { link } = require('../../routers/writer/editRoutes');
const models = require('../../models');
const bcrypt = require('bcrypt');
const controller = require('../admin/authContrller');
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


controllers.showEditPage = (req, res) => {
    res.render('writer-edit', { layout: 'writer-news-layout', createSuccess: req.flash('createSuccess'), createFail: req.flash('createFail') });
}
controllers.createNews = async (req, res) => {
    let linkimages = [];
    try {
        const images = req.files;
        if (images.length < 2) {
            throw "Phải đăng dủ hình đại diện và hình nền"
        }
        const news = req.body;
        const writerId = req.user;
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

        console.log('link image', linkimages);
        const newData = {
            title: news.title,
            content: news.content,
            abstract: news.abstract,
            tinyImagePath: linkimages[0],
            largeImagePath: linkimages[1],
            youtubePath: news.youtubePath,
            isDraft: true,
            isPremium: false,
            totalViewsCount: 0,
            weeklyViewsCount: 0,
            writerId: writerId,
            categoryId: 1
        };

        const newNews = await models.News.create(newData);
        if (!newNews) {
            throw "Không thể thêm bài viết mới"
        }

        const tags = news.tag.split(" ");
        for (let tagName of tags) {
            tagName = tagName.trim();
            console.log(tagName);
            let newTag;
            newTag = await models.Tag.findOne({ where: { name: tagName } });
            console.log('tag', newTag);
            if (!newTag) {
                newTag = await models.Tag.create({ name: tagName });
            }
            newNews.addTag(newTag);
        }

        const newsStatus = await models.NewsStatus.create({
            status: "unconfirm",
            publishDate: Date.now(),
            newsId: newNews.id
        })
        if (!newsStatus) {
            throw "Không cập nhật được trạng thái của bài viết bạn vừa đăng"
        }
        req.flash('createSuccess', 'Tạo bài viết thành công')
        res.redirect('/edit');
    }
    catch (err) {
        console.log(err)
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
        await bcrypt.compare(req.body.oldPassword, writer.password, (err, result) => {
            if (err) throw "Mật khẩu cũ không chính xác"
        })
        if (req.body.newPassword !== req.body.confirmPassword) throw "Mật khẩu mới và xác nhận mật khẩu phải giống nhau"

        const newHashPassword = await bcrypt.hashSync(req.body.newPassword, 8);
        const newWriter = await models.Writer.update({ password: newHashPassword }, { where: { id: writerId } });
        if (newWriter) {
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

controllers.editNews = async (req, res) => {
    try {
        const newsId = req.params.id;
        const writerId = req.user;
        const news = await models.News.findOne({ where: { id: newsId } });
        const status = await models.NewsStatus.findOne({ where: { newsId: newsId } });
        if (!news) {
            console.log('cannot find news');
            res.redirect('/listNews');
        }
        else if (writerId !== news.writerId || !status || status.status == 'approved') {
            res.redirect('/listNews');
        }
        else {
            console.log(news);
            const tag = await models.Tag.findAll({
                attributes: ['name'],
                include: [{
                    model: models.News,
                    where: { id: newsId }
                }]
            })

            let tagName = tag.reduce((res, cur) => {
                console.log('cur', cur.name);
                return res + cur.name + ' ';
            }, '');

            news.tag = tagName.trim();
            res.render('writer-edit', { layout: 'writer-news-layout', news: news });
        }
    } catch (err) {
        res.redirect('/listNews');
    }
}


controllers.updateNews = async (req, res) => {
    console.log("update news")
    const newsId = req.params.id;
    const writerId = req.user;
    const news = await models.News.findOne({ where: { id: newsId }, include: [{model: models.Tag}] });
    console.log('news', news)
    const status = await models.NewsStatus.findOne({ where: { newsId: newsId } });
    if (!news) {
        console.log("news");
        res.redirect('/listNews');
    }
    else if (writerId !== news.writerId || !status || status.status == "approved") {
        console.log("status", status)
        res.redirect('/listNews');
    }
    else {
        console.log('remove', await news.removeTags())
        let linkimages = [];

        try {
            const images = req.files;
            if (images.length == 1) {
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
                                console.log(`File uploaded to Firebase Storage. Download URL: ${downloadURL}`);
                            }
                        )
                    }
                )
            }
            const tag = req.body.tag;
            delete req.body.tag;

            const updateNews = {
                ...req.body,
            }
            console.log("updated news", updateNews)
            if (linkimages.length == 2) {
                Object.assign(updateNews, { tinyImagePath: linkimages[0], largeImagePath: linkimages[1] });
            }
            console.log("updated news", updateNews)
            const newNews = await models.News.update(updateNews, {
                where: { id: newsId }
            })
            console.log('updated news', newNews)
            const tagsRemove = await models.Tag.findAll({
                include: [{
                    model: models.News,
                    where: { id: newsId}
                }]
            })
            console.log('removeTag', tagsRemove.length);
            for (let tag of tagsRemove){
                console.log('removetag', tag.name);
                news.removeTag(tag);
            }

            
            const newsStatus = await models.NewsStatus.update({
                status: "unconfirm",
                publishDate: Date.now()
            }, { where: { newsId: newsId } });

            const tags = tag.split(" ");
            console.log('tags', tags)
            for (let tagName of tags) {
                tagName = tagName.trim();
                console.log(tagName);
                let newTag;
                newTag = await models.Tag.findOne({ where: { name: tagName } });
                console.log('tag', newTag);
                if (!newTag) {
                    newTag = await models.Tag.create({ name: tagName });
                }
                news.addTag(newTag);
            }

            res.redirect('/listNews');
        } catch (err) {
            console.log(err);
            res.redirect('/listNews');
        }
    }
}

module.exports = controllers;