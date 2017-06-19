var express = require('express');
var fs = require('fs');
var csv = require('fast-csv')
var http = require('http');
var bodyParser = require('body-parser');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.use(express.static('public'));

var person = JSON.parse(fs.readFileSync('data.json'));
person = person.slice(0,1)=='['?person:[];

app.listen('3000', function(){
    console.log('server is listening.... on localHost:3000')
});

const writeCSV = (file, data)=>{
  var stream = fs.createWriteStream(file);
  var dataForWrite = [];
  data.map((person, ind)=>{
    return([
      ind+1,
      person.name,
      person.address,
      person.profession,
      person.cnic,
      person.phone,
      person.gender
    ])
  })
  data.unshift(['S.R','Name','Address','Prfession','CNIC','Phone','Gander']);
  csv
    .write(dataForWrite)
    .pipe(stream)
}

app.post('/add',function(req,res){
    var bul = true;
    for(i=0;i<person.length;i++) {
      if(person[i].cnic == req.cnic){
        bul = false;
      }
    }
    if(bul){
      person.push(req.body);
      console.log('posted')
      fs.writeFile('data.json',JSON.stringify(person));
      writeCSV('data.csv',person)
      res.send(['submited!',200]);
    }else{
      console.log('Already Exist!');
      res.send(['Already Exist!',300]);
    }
})
app.post('/get-data',function(req,res){
    res.send(person);
})
app.post('/splic',function(req,res){
    person.splice(req.body.ind,1);
    console.log('deleted')
    fs.writeFile('data.json',JSON.stringify(person));
    writeCSV('data.csv',person)
    res.send('deleted');
})
