'use strict'

const controllers = {};
const models = require('../../models');

controllers.showLoginPage = (req, res) => {
    res.render('editor-login', {layout: 'editor-login-layout', messageEditorLogin: req.flash('messageEditorLogin')});
}

controllers.showListNews = async (req, res) => {
    const editorId = req.user;
    const page = isNaN(req.query.page)? 1 : parseInt(req.query.page);
    const LIMIT = 10;
    const offset = LIMIT * (page - 1);
    let {rows, count} = await models.News.findAndCountAll({
        include: [{
            model: models.SubCategory,
            required: true,
            include: [{
                model: models.Category,
                where: {editorId: editorId}
            }]
        },{
            require: true,
            attributes: ['status'],
            model: models.NewsStatus,
            where: {status: "unconfirm"}
        }],
        order: [['id', 'DESC']],
        limit: LIMIT,
        offset: offset,
        distinct: true
    });
    console.log(rows);
    res.render('editor-listNews',{
        layout: 'editor-news-layout',
        listNews: rows, successMessage: req.flash('successMessage'), 
        failureMessage: req.flash('failureMessage'),
        pagination: {page: page, limit: LIMIT, totalRows: count, queryParams: req.params}
    });
}

controllers.showDetail = async (req, res)=> {
    const newsId = req.params.id;
    const editorId = req.user;
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
        },{
            attributes: ['id', 'fullName', 'avatarPath'],
            model: models.Writer
        }
              
        ]
    });

    if (news.SubCategory.Category.editorId != editorId){ //check editor valid
        console.log('editorId', news.SubCategory.Category.editorId)
        res.redirect("/");
        return;
    }
    const date = new Date(news.updatedAt);
    news.updatedAt = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    news.date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    news.time = `${date.getHours()}:${date.getMinutes()}`;
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

controllers.showWorks = async (req, res) => {
    const editorId = req.user;
    const page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));
    const NEWS_LIMIT = 10;
    const newsOffset = NEWS_LIMIT * (page - 1);
    const {rows, count} = await models.News.findAndCountAll({
        include: [{
            model: models.NewsStatus,
            where: {
                editorId: editorId
            }
        }],
        limit: NEWS_LIMIT,
        offset: newsOffset
    })
    res.render('editor-works', {layout: 'editor-news-layout', works: rows, pagination: { page: page, limit: NEWS_LIMIT, totalRows: count, queryParams: req.params }});
}
module.exports = controllers;