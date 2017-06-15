var express = require('express');
var fs = require('fs');
var http = require('http');
// var request = require('ajax-request');
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
app.listen('3000', function(){
    console.log('server is listening.... on localHost:3000')
});
app.post('/add',function(req,res){
    console.log()
    person.push(req.body);
    console.log('posted')
    fs.writeFile('data.json',JSON.stringify(person));
    res.send('submited!');
})
app.post('/get-data',function(req,res){
    // console.log('posted')
    // fs.writeFile('data.json',JSON.stringify(person));
    res.send(person);
})
app.post('/splic',function(req,res){
    console.log()
    person.splice(req.body.ind,1);
    console.log('deleted')
    fs.writeFile('data.json',JSON.stringify(person));
    res.send('submited new person deta:'+JSON.stringify(person));
})