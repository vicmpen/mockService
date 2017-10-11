const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');


function tokenForUser(user) {

    const timestamp = new Date().getTime()
    return jwt.encode({ sub : user.id, iat:timestamp}, config.secret)
}

exports.signin = function (req,res,next) {

    console.log('------authiiing');
    const user = req.user;
    res.send({tonen:tokenForUser(user)})

};


exports.signup = function (req, res, next) {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password ){

        return res.status(422).send({error:'You must provide email and password'}) //unproccesable entity

    }

    User.findOne({email:email}, (error, existingUser) => {

        if (error){ return next(error)}

        if (existingUser) {
            return res.status(422).send({error:'Email is in use'}) //unproccesable entity
        }

        const user = new User({email:email, password:password});
        user.save( (error) => {
            if(error) {return next(error)}

            res.json({token: tokenForUser(user)})

        })
    })
};