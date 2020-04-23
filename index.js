const express = require('express');
const bodyParser = require('body-parser');
const gtts = require('gtts.js').gTTS
const path = require('path');
const upload = require("express-fileupload");
const fs = require('fs');
const pdfParse = require('pdf-parse');

const app = express();

PORT = process.env.PORT || 3000;

app.use(upload());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))





app.get('/',(req,res) => {
  res.sendFile(path.join(__dirname,'views','index.html'));
})
app.get('/main.js',(req,res) => {
  res.sendFile(path.join(__dirname,'views','main.js'));
})
app.get('/style.css',(req,res) => {
  res.sendFile(path.join(__dirname,'views','style.css'));
})
app.post('/',(req,res) => {
  if(req.files) {
    console.log(req.files);
    var file = req.files.file;
    fileName = file.name;
    console.log(fileName);
    file.mv('./uploads/' + fileName,(err) =>{
      if(err) {
        res.send(err)
      } else {
        res.send('File Succesfuly uploaded ');
        pdfFile = fs.readFileSync('./uploads/' + fileName);
        readPdfFile(pdfFile)
      }
    });
  }
})

app.listen(PORT,() => {
  console.log(`server running on ${PORT}`);
})



function readPdfFile(pdfFile) {
  pdfParse(pdfFile).then(function(data) {
    console.log(data.numpages);
    console.log(data.text);
  })
}
