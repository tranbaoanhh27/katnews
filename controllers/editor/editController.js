'use strict'

const controllers = {};
const models = require('../../models');
const checkEditor = require('./checkEditor')

controllers.showAccept = async (req, res) => {
    const newsId = req.params.id;
    const editorId = req.user;
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
                , {
                attributes: ['name'],
                model: models.SubCategory
            },
            {
                attributes: ['publishDate'],
                model: models.NewsStatus
            }
            ]
        });
        console.log(news)
        news.tag = news.Tags.reduce((res, cur, index) => {
            return res + cur.name + ',';
        }, '').slice(0, -1);

        const publishDate = news.NewsStatus.publishDate;
        news.publishDate = `${publishDate.getFullYear()}-` + ("0" + `${publishDate.getMonth() + 1}`).slice(-2) + `-${publishDate.getDate()}`
        console.log(news.publishDate);
        res.render('editor-accept', { layout: 'editor-news-layout', news: news })
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

            // update status, publishDate
            await models.NewsStatus.update({
                status: "approved",
                editorId: editorId,
                publishDate: req.body.publishDate
            }, {
                where: { newsId: newsId }
            })

            // update category
            const category = await models.SubCategory.findOne({
                where: { name: req.body.category.trim() }
            })
            if (!category) {
                throw "Chủ đề không hợp lệ";
            }
            const news = await models.News.findOne({
                where: { id: newsId },
                include: [{
                    model: models.Tag
                }]
            })
            if (news.categoryId != category.name) {
                await news.update({ categoryId: category.id })
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
                let newTag;
                newTag = await models.Tag.findOne({ where: { name: tagName } });
                if (!newTag) {
                    newTag = await models.Tag.create({ name: tagName });
                }
                news.addTag(newTag);
            }
        }
        req.flash('successMessage', "Duyệt bài thành công");
        res.redirect('/listNews');
    }
    catch (err) {
        req.flash('failureMessage', "Duyệt bài thất bại")
        res.redirect('/listNews')
    }
}

controllers.showReject = async (req, res) => {
    const newsId = req.params.id;
    const editorId = req.user;
    if (!checkEditor(editorId, newsId)){
        res.redirect('/');
        return;
    }
    const news = await models.News.findOne({
        attributes: ['id','title'],
        where: {id: newsId}
    });
    res.render('editor-reject', {layout: 'editor-news-layout', news: news})
}

controllers.reject = async (req, res) => {
    const newsId = req.params.id;
    const editorId = req.user;
    try {

        if (!checkEditor(editorId, newsId)){
            res.redirect('/');
            return;
        }
        await models.NewsStatus.update({
            status: "rejected",
            reasonReject: req.body.reasonReject
        }, {
            where: {newsId: newsId}
        })
        req.flash('successMessage', "Từ chối bài viết thành công");
        res.redirect('/listNews');
    }catch(err){
        req.flash('failureMessage', "Từ chối bài viết thất bại");
        res.redirect('/listNews');
    }
}

module.exports = controllers;