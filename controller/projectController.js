const path = require('path');
const multer = require('multer');
let documents = [];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/projects/documents'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.mimetype.split('/')[1];
    const filename = `${
      file.fieldname + req.user._id + '-' + uniqueSuffix
    }.${extension}`;
    if(file.fieldname==='documents'){
        documents.push(filename);
    }
    if(file.fieldname==='featureImage'){
        req.body.featureImage = filename;
    }
    req.body.documents = documents;
    cb(null, filename);
  },
});

const upload = multer({ storage });

exports.uploadProjectDocs = upload.fields([
  { name: 'featureImage', maxCount: 1 },
  { name: 'documents', maxCount: 10 },
]);
