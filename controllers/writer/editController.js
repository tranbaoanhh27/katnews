'use strict'

const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { link } = require('../../routers/writer/editRoutes');
const models = require('../../models');
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
            const filename = `${name}_${Date.now()}.${ext}`;

            await uploadBytes(ref(firebaseStorage, filename), image.buffer).then(
                async(snapshot) => {
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
            briefContent: news.briefContent,
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


module.exports = controllers;