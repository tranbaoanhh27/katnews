'use strict'

const controllers = {};
const models = require('../../models');
const checkEditor = require('./checkEditor');

controllers.showLoginPage = (req, res) => {
    res.render('editor-login', {layout: 'editor-login-layout', messageEditorLogin: req.flash('messageEditorLogin')});
}

controllers.showListNews = async (req, res) => {
    const editorId = req.user;
    let listNews = await models.NewsStatus.findAll({
        where: {editorId},
        include: [{
            attributes: ['id', 'title', 'tinyImagePath', 'abstract'],
            model: models.News
        }]
    })
    listNews = listNews.filter(item => item.status == 'unconfirm');

    res.render('editor-listNews', {layout: 'editor-news-layout', listNews: listNews, successMessage: req.flash('successMessage'), failureMessage: req.flash('failureMessage')});
}

controllers.showDetail = async (req, res)=> {
    const newsId = req.params.id;
    const editorId = req.user;
    console.log(newsId);
    const news = await models.News.findOne({
        where: {id: newsId},
        include: [{
            attributes: ['id', 'name'],
            model: models.SubCategory,
            include: [{
                attributes: ['editorId'],
                model: models.Category,
            }]
        },
        {
            attributes: ['id', 'name'],
            model: models.Tag
        }
              
        ]
    });

    if (news.SubCategory.Category.editorId != editorId){
        res.redirect("/");
        return;
    }

    res.render('editor-detail', {layout: 'editor-news-layout', news: news});
}

controllers.showInformation = async (req, res) => {
    const editorId = req.user;
    const editor = await models.Editor.findOne({
        where:{id: editorId}
    })
    editor.date = `${editor.updatedAt.getDate()}/${editor.updatedAt.getMonth() + 1}/${editor.updatedAt.getFullYear()}`;  
    res.render('editor-information', {layout: 'editor-news-layout', editor: editor});
}
module.exports = controllers;