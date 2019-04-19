const scrape = require('./scrape');
const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    scrape.then(noticeArray=>{
        return res.send(noticeArray);
    }).catch(err=>{
        return res.send(err);
    });
});

var port = process.env.PORT || 8080;

app.listen(port);

console.log('listening to port '+port);