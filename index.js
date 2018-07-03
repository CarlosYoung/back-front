var express = require('express')
var app = express()
var fs = require('fs')
var users = []

fs.readFile("user.json", {encoding: 'utf8'},(err,data)=>{
    users=JSON.parse(data);
    // JSON.parse(data).forEach(elemento => {
    //     users.push(elemento);
    //     console.log(users);
    // });
  });

app.use('/users',(req,res)=>{
        res.send(users);
});

    app.use('/:username',(req,res)=>{
        var username=req.params.username;
        var resultado=users.filter(user=>{
            if(user.username==username)
            return true
            else
            return false
    });
    if (resultado.length>0)
        res.send(resultado[0]);
    else
        res.status(404).send("username not found")
});
app.use('/',(req,res)=>{
    res.send(new Date());
});
var server=app.listen(process.env.PORT,()=>{
    console.log('server running at http://localhost:'+server.address().port)
});