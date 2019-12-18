var multer = require('multer');
var path = require('path');


function MyModelClass() {

    this.storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            var newName = Date.now() + path.extname(file.originalname);
            cb(null, newName);
        }
    });


    this.uploadFile = multer({
        storage: this.storage,
        fileFilter: function (req, file, cb) {
            if (req.filTypeIs && req.filTypeIs == 'all') {
                cb(null, true);
            } else {
                if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {

                    cb('Only image files are allowed!', false);
                } else {
                    cb(null, true);
                }
            }
        }
    }).any();

    this.uploadFields = multer({
        storage: this.storage,
        fileFilter: function (req, file, cb) {
            if (req.filTypeIs && req.filTypeIs == 'all') {
                cb(null, true);
            } else {
                if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {

                    cb('Only image files are allowed!', false);
                } else {
                    cb(null, true);
                }
            }
        }
    }).none();

    this.uploadUserProfilePic = multer({
        storage: this.storage,
        fileFilter: function (req, file, cb) {
            if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                return cb('Only jpg, jpeg, png, gif files are allowed!', false);
            } else {
                cb(null, true);
            }
        }
    }).any();

    this.mailAttachmentStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "public/uploads/mail-attachments")
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })
    this.mailAttachment = multer({
        storage: this.mailAttachmentStorage,
        fileFilter: function (req, file, cb) {
            if (req.filTypeIs && req.filTypeIs === 'all') {
                cb(null, true);
            } else {
                if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|doc|DOC|docx|DOCX|xls|XLS|xlsx|XLSX|ppt|PPT|pptx|PPTX|pdf|PDF|txt|TXT)$/)) {
                    cb('Files allowed only for extension jpg, jpeg, png, gif, doc, docx, xls, xlsx, ppt, pptx, pdf, txt', false);
                } else {
                    cb(null, true);
                }
            }
        }
    }).any();


}

module.exports = new MyModelClass();