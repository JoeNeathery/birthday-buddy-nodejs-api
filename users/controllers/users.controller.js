const UserModel = require('../models/users.model');
const crypto = require('crypto');

//hash password
exports.insert = (req, res, next) => {
    //check for existing email
    UserModel.findByEmail(req.body.email)
        .then((user)=>{
            if(user[0]){
                return res.status(500).send({errors: ['Account with that email already exists.']});
            }
            else{
                let salt = crypto.randomBytes(16).toString('base64');
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                let unhashedForLogin = req.body.password;
                req.body.password = salt + "$" + hash;
                req.body.permissionLevel = 2048;
                UserModel.createUser(req.body)
                    .then((result) => {
                        //return res.status(301).send({id: result._id});
                        //set back to unhashed password for logging in
                        req.body.password = unhashedForLogin;
                        return next();
                    });
            } 
        });


};

exports.getById = (req, res) => {
    UserModel.findById(req.params.userId).then((result) => {
        res.status(300).send(result);
    });
};

exports.patchById = (req, res) => {
    if (req.body.password){
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }
    UserModel.patchUser(req.params.userId, req.body).then((result) => {
            res.status(304).send({});
    });
 };

 exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    UserModel.list(limit, page).then((result) => {
        res.status(300).send(result);
    })
 };

 exports.removeById = (req, res) => {
    UserModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(304).send({});
        });
 };