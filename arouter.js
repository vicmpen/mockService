
const authentication = require('./controllers/authentication')
const errorResponse = require('./responses/loginError.json')
const companies = require('./responses/companies.json')
const companyDetails = require('./responses/companyDetails.json')

//const passportService = require('./services/passport');
//const passport = require('passport');

//const requireAuth = passport.authenticate('jwt', {session :false});
//const requireSigning = passport.authenticate('local', { session :false });

module.exports = function (app) {

    function authorize(req,res) {
        if (req.headers.authorization !== authentication.tokenForUser(req.query.username)) {
            return false
        }
        console.log(req.headers.authorization)
        return true
    }

    app.get('/', function (req,res) {
        if(authorize(req,res) === false) {
            res.status(403)
            res.send({message:'Wrong token'})
            return
        }
        res.send({message:'Super Secret Code is ABC'})
    });

    app.post('/signin1',  function(req, res) {
        if(req.body.username === 'abc'){
            res.status(403)
            res.send(errorResponse)
            return
        }
        res.send({
            loggedIn:true,
            username:req.body.username,
            token:authentication.tokenForUser(req.body.username)
        })

    });

    app.get('/homeCustomer',  function(req, res) {
        //token check
        if(authorize(req,res) === false) {
            res.status(403)
            res.send({message:'Wrong token'})
            return
        }

        //search
        let searchResult
        let statementString = ''
        if(req.query.companyName != null){
            statementString = 'company.name === req.query.companyName'
        }

        if(req.query.code != null){
            statementString += ' && company.code === req.query.code'
        }

        if(req.query.serviceId != null){
            statementString += '&& company.ServiceId === req.query.ServiceId'
        }

        if(req.query.idNumber != null){
            statementString += '&& company.IdNumber === req.query.IdNumber'
        }

        if(req.query.baCode != null){
            statementString += '&& company.baCode === req.query.baCode'
        }

        searchResult = companies.filter((company) => {
            return eval(statementString)
        })
       res.send(searchResult)



    });

    app.get('/homeCustomerInfo',  function(req, res) {
        //token check
        if (authorize(req, res) === false) {
            res.status(403)
            res.send({message: 'Wrong token'})
            return
        }

        searchResult = companyDetails.filter((company) => {
            if(req.query.code == company.code){
                return companyDetails
            }
        })

        res.send(searchResult)
    });
    app.get('/homeoffersearch',function(req,res){
        if (authorize(req, res) === false) {
            res.status(403)
            res.send({message: 'Wrong token'})
            return
        }
        res.send('')
    })

    app.get('/companydetails/:id',function (req,res) {
        if (authorize(req, res) === false) {
            res.status(403)
            res.send({message: 'Wrong token'})
            return
        }
        const resultSet= companyDetails.filter(company=>company.code===req.params.id)
        res.send(resultSet)
    })

    app.get('/addressesdetails',function(req,res){
        if (authorize(req, res) === false) {
            res.status(403)
            res.send({message: 'Wrong token'})
            return
        }
        res.send('')
    })
    app.get('/billingaccountdetails',function(req,res){
        if (authorize(req, res) === false) {
            res.status(403)
            res.send({message: 'Wrong token'})
            return
        }
        res.send('')
    })
    app.delete('/service/:id',function(req,res){
        if (authorize(req, res) === false) {
            res.status(403)
            res.send({message: 'Wrong token'})
            return
        }
        res.send('')
    })
    app.post('/selectedservices',function(req,res){
        if (authorize(req, res) === false) {
            res.status(403)
            res.send({message: 'Wrong token'})
            return
        }
        res.send('')
    })
    app.get('',function(req,res){
        if (authorize(req, res) === false) {
            res.status(403)
            res.send({message: 'Wrong token'})
            return
        }
        res.send('')
    })

};

