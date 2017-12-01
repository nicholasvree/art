
var db = require("../models");
var passport = require('passport')
var flash = require('connect-flash');

module.exports = function(app) {

//Retrieves Hunt with populated Clues
    app.get("/api/hunt/:huntId", function(req, res){
        db.Hunt
        .find({category: req.params.huntId})
        .populate("clue")
        .then(function(dbHunt){
            res.json(dbHunt)
            console.log(dbHunt)
        })
        .catch(function(err){
            console.log(err)
            res.json(err)
        })
    })

//On completing a Hunt, saves score to database for user
    app.post('/api/saveScore', function(req, res){
        db.Score
        .create(req.body)
        .then(function(dbScore){
            res.json(dbScore)
            return db.User.findOneAndUpdate({_id: req.session.passport.user}, {$push: {score: dbScore._id}}, {new: true});
        })
        .catch(function(err){
            console.log(err)
            res.json(err)
        })
    })

//POSTMAN WAY to post Hunts
    app.post("/api/hunt/:id", function(req, res){
        db.Hunt
        .create({title: "Contemporary Art", category: 8})
        .then(function(dbHunt){
            res.json(dbHunt)
            console.log(dbHunt)
        })
        .catch(function(err){
            console.log(err)
        })
    })

//POSTMAN WAY to post Clues
    app.post("/api/clue/:huntId", function(req, res){

        console.log(req.body)

        db.Clue
        .create(req.body)
        .then(function(dbClue){
            console.log(dbClue)
            res.json(dbClue)
             return db.Hunt.findOneAndUpdate({ category: req.params.huntId }, {$push: {clue: dbClue._id }}, { new: true });
        })
        .catch(function(err){
            res.json(err)
            console.log(err)
        })
    })

//AUTH Login
  app.post('/login', function (req, res, next) {
    passport.authenticate('login', function (err, user, info) {
        if (err) {
            console.log("FROM LOGIN", err)
            return next(err);
        }
        if (!user) {
            console.log("Incorrect username/password")
            return res.json("Incorrect username/password")

        }
        req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                    console.log(err)
                }
                    console.log("LOGGED IN")
                    return res.send(req.user);
            });
    })(req, res, next);
});

//AUTH Register
    app.post('/signup', function(req,res,next){
        passport.authenticate('signup', function (err, user, info) {
            if (err) {
                console.log("FROM Registration", err)
                return next(err);
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                    console.log(err)
                }
                    console.log("LOGGED IN")
                    return res.send(req.user);
            });
    })(req, res, next);
});


//AUTH Logout
      app.get('/logout', function(req, res){
        req.logout();
        req.session.destroy(function (err) {
            if (err) { return next(err); }
            return res.send(req.user);
          });
      });

//AUTH retrieves current USER info
    app.get('/api/currentUserId', function(req, res){

        db.User.findById(req.session.passport.user)
        .then(function(dbCurrentUser){
            console.log("66666", dbCurrentUser)
            res.json(dbCurrentUser)
        })
        .catch(function(err){
            console.log("CONTROLLER - checkUserId", err)
           // res.json(err)
        })
    })

}
