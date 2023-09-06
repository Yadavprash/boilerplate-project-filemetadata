var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadDirectory = 'uploads/';

// Check if the 'uploads' directory exists; if not, create it.
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}


// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});


const upload = multer({ storage });

var app = express();

app.use(cors());


app.use('/public', express.static(__dirname +`/public`));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.post('/api/fileanalyse',upload.single('upfile'),(req, res)=>{
  const fileName = req.file.originalname;
  const fileSize = req.file.size;
  const fileType = req.file.mimetype;
  res.json({ name: fileName,type:fileType, size:fileSize})
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
