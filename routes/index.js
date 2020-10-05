const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = './public/uploads'

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', (req, res) => {
  fs.readdir(path, function(err, items) {
   let newImage = items.map(img => `${img}`)
   res.render('index', { title: 'Kenziegram', picture: newImage }
   
   
    ) 
    
  });

})

module.exports = router;
