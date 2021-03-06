
var db = require("../models");
var passport = require('passport')
var flash = require('connect-flash');

module.exports = function(app) {

//Gets a list of Hunts
    app.get("/api/hunt", function(req,res){
        db.Hunt
        .find({})
        .then(function(dbHunt){
            console.log(dbHunt)            
            res.json(dbHunt)
        })
        .catch(function(err){
            console.log(err)
            res.json(err)
        })
    })

//Retrieves Hunt with populated Clues
    app.get("/api/hunt/:huntId", function(req, res){
        console.log("HUNT RETRIEVE CALLED")
        db.Hunt
        .find({category: req.params.huntId})
        .populate("clue")
        .then(function(dbHunt){
             console.log("HUNT", dbHunt)
            res.json(dbHunt)
        })
        .catch(function(err){
            console.log("err", err)
            res.json(err)
        })
    })

    app.get('/api/score', function(req,res){
        console.log("ZZZZZZZZZZZZ ALLLLEEDD")
        db.User
        .findOne({_id: req.session.passport.user})
        .populate("score")
        .then(dbUser => {
            console.log("USER SCORES", dbUser)            
            res.json(dbUser)
        })
        .catch(function(err){
            console.log("ERRRRR", err)
            res.json(err)
        })
    })
    



//On completing a Hunt, saves score to database for user
    app.post('/api/score', function(req, res){
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

//Saves essential Image info to DB for user
app.post('/api/saveimage', function(req, res){
    db.Image
    .create(req.body)
    .then(function(dbImage){
        res.json(dbImage)
        console.log(req.session.passport.user)
        return db.User.findOneAndUpdate({_id: req.session.passport.user}, {$push: {image: dbImage._id}}, {new: true});
    })
    .catch(function(err){
        res.json(err)
    })
})

app.get('/api/saveimage', function(req, res){
    db.User
    .findOne({_id: req.session.passport.user})
    .populate("image")
    .then(dbUser => {
        res.json(dbUser)
    })
    .catch(function(err){
        res.json(err)
    })
})


//POSTMAN WAY to post Hunts
    app.post("/api/hunt/:id", function(req, res){
        db.Hunt
        .create(req.body)
        .then(function(dbHunt){
            res.json(dbHunt)
        })
        .catch(function(err){
        })
    })

//POSTMAN WAY to post Clues
    app.post("/api/clue/:huntId", function(req, res){
        
        console.log(req.body)

        db.Clue
        .create(req.body)
        .then(function(dbClue){
            console.log("DBCLUE", dbClue)
            res.json(dbClue)
             return db.Hunt.findOneAndUpdate({ category: req.params.huntId }, {$push: {clue: dbClue._id }}, { new: true });
        })
        .catch(function(err){
            console.log(err)
            res.json(err)
        })
    })

//AUTH Login
  app.post('/login', function (req, res, next) {
    passport.authenticate('login', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json("Incorrect username/password")

        }
        req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                    return res.send(req.user);
            });
    })(req, res, next);
});

//AUTH Register
    app.post('/signup', function(req,res,next){
        passport.authenticate('signup', function (err, user, info) {
            if (err) {
                return next(err);
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
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
            res.json(dbCurrentUser)
        })
        .catch(function(err){
           // res.json(err)
        })
    })

}
