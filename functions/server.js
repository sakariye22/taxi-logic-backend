const express = require('express');
const app = express();

app.use(express.json());

app.get ('/',(req,res)=>{
    res.json('ok');
});
app.get('/drivers',(req,res)=> {
    res.json('driver 1 ');
})
module.exports = app;