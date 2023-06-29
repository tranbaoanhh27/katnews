'use strict'

const router = require('express').Router();
const controllers = require('../../controllers/editor/editController');
const authController = require('../../controllers/editor/authController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const {body, getErrorMessage} = require('../../controllers/validator')


router.post('/accept/:id',
    authController.isLoggedIn,
    body('tags').trim().notEmpty().withMessage('Cần phải nhập tag cho bài báo'),
    body('category').notEmpty().withMessage('Cần phải chọn chuyên mục cho bài báo'),
    body('publishDate').notEmpty().withMessage("Cần phải chọn thời gian xuất bản"),
    body('publishDate').custom((publishDate, { req })=>{
        console.log(new Date(req.body.publishDate));
        if (new Date(req.body.publishDate) < Date.now()){
            throw new Error("Thời gian xuất bản không hợp lệ");
        }
        return true;s
    }),(req, res, next) => {
        const message = getErrorMessage(req);
        if (message){
            req.flash('acceptMessage', message);
            res.redirect(req.originalUrl);
            return;
        }
        next();
    },
    controllers.accept);
router.get('/accept/:id', authController.isLoggedIn, controllers.showAccept);
router.get('/reject/:id', authController.isLoggedIn, controllers.showReject);

router.post('/reject/:id',
    authController.isLoggedIn, 
    body('reasonReject').trim().notEmpty().withMessage('Cần phải nhập lý do từ chối'),
    (req, res, next)=>{
        const message = getErrorMessage(req);
        if (message){
            req.flash('rejectMessage', message);
            res.redirect(req.originalUrl);
            return;
        }
        next();
    },
    controllers.reject);
router.post('/information', authController.isLoggedIn, controllers.editInformation);
router.post('/avatar', authController.isLoggedIn,upload.single('avatar'), controllers.editAvatar);
module.exports = router;