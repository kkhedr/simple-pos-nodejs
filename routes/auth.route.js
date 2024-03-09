var express = require('express');
const authenticationRouter = express.Router();
var jwt = require('jsonwebtoken');
var md5 = require('md5');
var env = require('dotenv');
var models = require('../models/index');
env.config();


authenticationRouter.get('/get-pasword', function(req,res){
console.log(md5('1234678'));
});

authenticationRouter.post('/login', function (req, res) {
   
    try {
        models.user.findOne({where:{email: req.body.email, password: md5(req.body.password) }}).then( user => {
            if (!user)
                console.log(md5('12345678'));
                return  res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });

            jwt.sign({'user_id': user.id,'first_name':user.first_name,'email': user.email},
            env.process.secret, {expiresIn: 60 * 60* 60*24}, (err, token) =>{
                     if (err)
                         console.log(err);
                     return  res.status(200).json({ success: true,'userToken': token });
            });
        }).catch(error => res.status(400).json(error));
    }
    catch (err) {
        return  res.status(500).json({success: false, message: "There was an error attempting to login. Please try again later."});
    }
});

module.exports = authenticationRouter;

