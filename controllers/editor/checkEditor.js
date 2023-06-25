'use strict'

const models = require('../../models');

const checkEditor = async (editorId, newsId)=>{
    const news = await models.News.findOne({
        where: {id: newsId},
        include: [{
            attributes: ['id'],
            model: models.SubCategory,
            include: [{
                attributes: ['editorId'],
                model: models.Category,
            }]
        }    
        ]
    });

    if (news.SubCategory.Category.editorId != editorId){
        return false;
    }
    return true;
}

module.exports = checkEditor;