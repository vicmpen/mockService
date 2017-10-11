const authentication = require('./controllers/authentication')

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session :false});
const requireSigning = passport.authenticate('local', { session :false });

module.exports = function (app) {

    app.get('/', requireAuth, function (req,res) {
       res.send({message:'Super Secret Code is ABC'})
    });

    app.post('/signin', requireSigning, authentication.signin);

    app.post('/signup', authentication.signup);

};

