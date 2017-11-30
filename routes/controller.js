
var db = require("../models");
var passport = require('passport')
var flash = require('connect-flash');



module.exports = function(app) {

    app.get("/api/hunt/:huntId", function(req, res){

        console.log("99999", req.session.passport.user)

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

    app.post("api/score/:userId", function(req, res){
        console.log(req.body)
        db.Score
        .create(req.body)
        .then(function(dbScore){
            console.log(dbScore)
            res.json(dbScore)
            return db.User.findOneAndUpdate({user: req.params.userId}, {$push: {score: dbScore._id}}, {new: true});
        })
        .catch(function(err){
            res.json(err)
            console.log(err)
        })
    })

    app.get("/", function(req,res){
        console.log("redirected")
        res.json("true")
    })


    app.post('/login',
    passport.authenticate('login', { successRedirect: '/',
                                     failureRedirect: '/',
                                     failureFlash: false }), 
                                     function(req,res){
                                         res.redirect('/')

                                     }
  );


    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash : true 
      }));


    app.get('/api/currentUserId', function(req, res){
        let currentUserId = req.session.passport.user

        db.User.findById(currentUserId)
        .then(function(dbCurrentUser){
            console.log("66666", dbCurrentUser)
            res.json(dbCurrentUser)
        })
        .catch(function(err){
            console.log(err)
            res.json(err)
        })
    })

}
