console.log('Jai shree Ganesh');

// Require required modules
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

Users = require('./models/users');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Jai shree Ram'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/users', function(req, res) {
    
    
    //res.send('Welcome to Users page');
    console.log('In get users');
    Users.getUsers(function (err, users) {

        if(err) {
            throw err;
        }

        console.log('USERRRRRRRRRR - ' + users[0].userId);

        res.json(users);
    });
});

app.post('/verifyUser', function(req, res) {
    
    //res.send('Welcome to verify user');
    console.log('In verifyUser');

    var inputVerifyUser = req.body;
    var userNameFromRequest = inputVerifyUser.userName
    var passwordFromReqeust = inputVerifyUser.password;
    
    var password;

    Users.getUser(userNameFromRequest, function (err, user) {

        if(err) {
            resMsg = err;
        } else {

            password = user[0].password;

            if(passwordFromReqeust!=null && passwordFromReqeust === password) {
                resMsg = {"Result":"Success"};
            } else {
                resMsg = {"Result":"Failure"};
            }
            //resMsg = 'userId - ' + user[0].userId + ' userName - ' + user[0].userName + ' password - ' + user[0].password;
        }

        console.log(resMsg);
        
        res.json(resMsg);
    });
    
});

app.post('/addUser', function(req, res) {

    var user = req.body;
    console.log('user - ' + req.body);
    Users.addUser(user, function(err, user) {
        if(err) {
            console.error('Error occurred - ' + err);
            resMsg = err;
        } else {
            resMsg = user;
        }
        res.json(resMsg);
    });
});

mongoose.connect('mongodb://localhost/sosdb', {useNewUrlParser:true});
var db = mongoose.connection;