const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users')
const meetingsRouter = require('./routes/meetings')
let User = require('./models/user.model')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri , {useNewUrlParser: true , useCreateIndex: true , useUnifiedTopology: true}).then(() => console.log('mongoDB connected')).catch(
  err => console.log(err)
);


 app.use('/users' , usersRouter)
 app.use('/meetings' , meetingsRouter)



 const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: '../src/images/',
  filename: function(req, file, cb){
    let name = file.fieldname + '-' + Date.now()+ Math.floor(100000 + Math.random() * 900000) + path.extname(file.originalname)
    cb(null,name);
    User.findById(req.params.id)
    .then(user => {
      user.profilePic = name
      user.save().then(() => console.log('user updated'))
        })
    .catch(err => console.log(err))
   
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}


// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));



app.post('/upload/:id', (req, res) => {
  upload(req, res, (err) => {
    
    if(err){
      res.json(err + "please return to the previous page and try again")
      User.findById(req.params.id)
      .then(user => {
        user.profilePic = 'test.png'
        user.save().then(() => console.log('user updated'))
          })
      .catch(err => console.log(err))
    } else {
      if(req.file == undefined){
        User.findById(req.params.id)
        .then(user => {
          user.profilePic = 'test.png'
          user.save().then(() => console.log('user updated'))
            })
        .catch(err => console.log(err))
        
        res.json("file is undefined please return to the previous page and try again")
      } else {
        file: `uploads/${req.file.filename}`

        res.json("image uploaded and profile pic changes successfully  please turn back to the previous page")
        
       
      }
    }
  });
});



app.listen(port , () => {

    console.log(`server is running at port ${port}`)

});
