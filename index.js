var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const bodyParser = require('body-parser')

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder where uploaded files will be stored
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Define the filename for the uploaded file
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

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
