var http = require('http');
var url = require('url');
var fs = require("fs");
var path = require('path');


var listFile = './list.json';

var server = http.createServer(function (req, res) {
    console.log('received request');
    var pathObj = url.parse(req.url, true);
    console.log(pathObj.pathname + ' , ' + JSON.stringify(pathObj.query));
    if('/list' === pathObj.pathname) {
        console.log('list');
        res.setHeader('Content-Type','text/plain;charset=utf-8');
        res.writeHead(200,'OK');
        var listPath = path.join(__dirname, listFile);
        console.log(listPath);
        fs.readFile(listPath, 'binary',function (err, fileContent) {
            if(err) {
                console.log('list error');
                res.write('[]');
                res.end();
            }else {
                console.log('list OK');
                res.end(fileContent,'binary');
            }
        })
    }else if(pathObj.pathname.indexOf('/images') !== -1) {
        var imagePath = path.join(__dirname, pathObj.pathname);
        res.setHeader('Content-Type','image/*');
        fs.readFile(imagePath,'binary',function (err,fileContent) {
            if(err) {
                console.log(err);
                console.log('image error');
                res.end();
            }else {
                res.end(fileContent,'binary');
            }

        })

    }else if(pathObj.pathname.indexOf('/music') !== -1){
        res.setHeader('Content-Type','audio/mp3');
        var imagePath = path.join(__dirname, pathObj.pathname);
        fs.readFile(imagePath,'binary',function (err,fileContent) {
            if(err) {
                console.log(err);
                console.log('image error');
                res.end();
            }else {
                res.end(fileContent,'binary');
            }

        })

    }else {
        res.writeHead(200,'OK');
        res.write('end');
        res.end();
    }

});

server.listen(9090);
console.log('server started');




