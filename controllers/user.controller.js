const models = require('../models');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');


function index(req, res){
    res.send("JJJ");
}
function signUp(req, res){

    models.User.findOne({where:{email:req.body.email}}).then(result =>{
        if(result){
            res.status(409).json({
                message: "Email already exists"
            });
        }else{
            bcryptjs.genSalt(10, (err, salt)=>{
                bcryptjs.hash(req.body.password, salt, (err, hash)=>{
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }
                
                
                    models.User.create(user).then(result => {
                        res.status(201).json({
                            message: "User Created",
                            success: true
                        });
                    }).catch(error => {
                        res.status(500).json({
                            message: "An error occurred",
                            error: error
                        });
                    });
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "An error occurred",
            error: error
        });
    });

   


}

function login(req, res){
    models.User.findOne({where:{email: req.body.email}}).then(user =>{
        if(user === null){
            res.status(401).json({
                message: "Invalid credentials"
            });
        }else{  
            bcryptjs.compare(req.body.password, user.password, (err, result)=>{
                if(result){
                    const token =  jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, 'secret', (err, token)=>{
                        res.status(200).json({
                            message: "Authentication successful",
                            token: token
                        });
                    });

                }else{
                    res.status(401).json({
                        message: "Invalid credentials"
                    });
                }
            });
        }
    }).catch(error =>{
        res.status(500).json({
            message: "An error occurred",
            error: error
        });
    });    
}

module.exports = {
    signup: signUp,
    index: index,
    login: login
}