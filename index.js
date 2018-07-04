var express = require('express')
var app = express()
var fs = require('fs')
var bodyParser=require('body-parser')

//usamos middlewares body-parser
app.use(bodyParser.json())
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
app.post('/user',(req,resp)=>{
    var user=req.body.user
    if(user.username!==undefined&&user.username.length>0){
        if(user.email!==undefined&&user.email.length>0){

            users.push(user);
            resp.send(user);

        
    }else{
        resp.status(400).send('invalid email field');
    }   
    }else{
        resp.status(400).send('invalid username field');
    }
})

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