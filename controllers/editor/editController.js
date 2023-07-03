'use strict'

const controllers = {};
const { async } = require('@firebase/util');
const models = require('../../models');
const checkEditor = require('./checkEditor');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');

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

controllers.showAccept = async (req, res) => {
    const newsId = req.params.id;
    const editorId = req.user;
    const category = await models.SubCategory.findAll({ attributes: ['id', 'name'] })
    if (!checkEditor(editorId, newsId)) {
        res.redirect('/');
        return;
    }
    else {
        const news = await models.News.findOne({
            attributes: ['id', 'categoryId'],
            where: { id: newsId },
            include: [{
                attributes: ['name'],
                model: models.Tag
            }
                ,
            {
                attributes: ['publishDate'],
                model: models.NewsStatus
            }
            ]
        });

        news.tag = news.Tags.reduce((res, cur, index) => {
            return res + cur.name + ',';
        }, '').slice(0, -1);

        const publishDate = news.NewsStatus.publishDate;
        news.publishDate = `${publishDate.getFullYear()}-` + ("0" + `${publishDate.getMonth() + 1}`).slice(-2) + `-${publishDate.getDate()}`;
        news.acceptMessage = req.flash('acceptMessage');
        res.render('editor-accept', { layout: 'editor-news-layout', news: news, category: category })
    }
}

controllers.accept = async (req, res) => {
    const editorId = req.user;
    const newsId = req.params.id;
    try {

        if (!checkEditor(editorId, newsId)) {
            res.redirect('/');
            return;
        }
        else {

            await models.sequelize.transaction(async (t) => {
                // update status, publishDate
                await models.NewsStatus.update({
                    status: "approved",
                    editorId: editorId,
                    publishDate: req.body.publishDate
                }, {
                    where: { newsId: newsId }
                }, { transaction: t })

                // update category
                const category = await models.News.update({ categoryId: req.body.category }, { where: { id: newsId } }, { transaction: t });
                if (!category) {
                    throw "Chủ đề không hợp lệ";
                }
                const news = await models.News.findOne({
                    where: { id: newsId },
                    include: [{
                        model: models.Tag
                    }]
                }, { transaction: t });
                if (news.categoryId != category.name) {
                    await news.update({ categoryId: category.id },{ transaction: t })
                }

                // update tag
                const tags = req.body.tags.split(',')
                // remove all tags
                for (let tag of news.Tags) {
                    news.removeTag(tag);
                }
                // add news tags
                for (let tagName of tags) {
                    tagName = tagName.trim();
                    if (tagName.length == 0) continue;
                    let newTag;
                    newTag = await models.Tag.findOne({ where: { name: tagName } }, { transaction: t });
                    if (!newTag) {
                        newTag = await models.Tag.create({ name: tagName }, { transaction: t });
                    }
                    news.addTag(newTag);
                }
            });
        }
        req.flash('successMessage', "Duyệt bài thành công");
        res.redirect('/listNews');
    }
    catch (err) {
        console.log(err);
        req.flash('failureMessage', "Duyệt bài thất bại")
        res.redirect('/listNews')
    }
}

controllers.showReject = async (req, res) => {
    const newsId = req.params.id;
    const editorId = req.user;
    if (!checkEditor(editorId, newsId)) {
        res.redirect('/');
        return;
    }
    const news = await models.News.findOne({
        attributes: ['id', 'title'],
        where: { id: newsId }
    });
    news.rejectMessage = req.flash('rejectMessage');
    res.render('editor-reject', { layout: 'editor-news-layout', news: news })
}

controllers.reject = async (req, res) => {
    const newsId = req.params.id;
    const editorId = req.user;
    try {

        if (!checkEditor(editorId, newsId)) {
            res.redirect('/');
            return;
        }
        await models.NewsStatus.update({
            status: "rejected",
            reasonReject: req.body.reasonReject,
            editorId: editorId
        }, {
            where: { newsId: newsId }
        })
        req.flash('successMessage', "Từ chối bài viết thành công");
        res.redirect('/listNews');
    } catch (err) {
        req.flash('failureMessage', "Từ chối bài viết thất bại");
        res.redirect('/listNews');
    }
}

controllers.editInformation = async(req, res) => {
    const editorId = req.user;
    const fullName = req.body.fullName;
    const editor = await models.Editor.update({fullName: fullName}, {where: {id: editorId}});
    res.redirect('/information');
}

controllers.editAvatar = async(req, res) => {
    const editorId = req.user;
    try{
        const image = req.file;
        let name = image.originalname.split('.')[0];
        let ext = image.originalname.split('.')[1];
        const filename = `editor/${name}_${Date.now()}.${ext}`;

        await uploadBytes(ref(firebaseStorage, filename),image.buffer, { contentType: image.mimetype } ).then(
            async (snapshot)=>{
                await getDownloadURL(snapshot.ref).then(
                    async (downloadURL) => {
                        await models.Editor.update({avatarPath: downloadURL}, {where: {id: editorId}}); 
                    }
                )
            }
        )
        res.redirect('/information');
    }catch(error){
        res.redirect('/information');
    }
}

module.exports = controllers;