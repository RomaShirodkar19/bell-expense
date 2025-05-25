const multer = require("multer");

//config storage
const storage = multer.diskStorage({
    destination: (req, file, cb) =>
        {
            cb(null, 'uploads/');
        },
    filename: (req, file, cb) =>
        {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
});

//filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if(allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("only .jpeg, .jpg and .png formats are allowed"), false);
    }
};

exports.upload = multer({ storage, fileFilter });