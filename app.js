// re-worked following Jacob's walkthrough
// re-worked with Juddie

//images post but the upload view page is non-workinggit 

const express = require('express');
const app = express();
const port = 3000;
app.set('port', port) // new 03/11/2022
module.exports = app; // new -3/11/2022
const multer = require('multer');
const pug = require('pug');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

app.use(express.static('./public'));

// multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + uuidv4() + path.extname(file.originalname));
    }
});

app.get('/', function (req, res) {
    const path = "../public/uploads";
    fs.readdir(path, function (err, items) {
        res.render("index", { label: "Welcome to Kenziegram 2", photos: items })
    });
})

const uploads = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb('Error: Images Only!');
        }
}

// Pug
app.set('view engine', 'pug');

// TODO: cannot resolve req.file.filename error, changed upload to uploads 03/11/2022
app.post("/upload", uploads.single('myFile'), (res, req) => {
    let photos = req.file.filename
    res.render("uploads", { photos });
});

app.listen(port, () => console.log(`Server started on port ${port}`));