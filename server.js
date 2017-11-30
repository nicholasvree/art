const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require('passport');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());


const PORT = process.env.PORT || 3001;

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(flash());

app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/arthunt",
  {
    useMongoClient: true
  }
);

var db=require("./models")

require("./routes/controller.js")(app);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  db.User.findById(id, function(err, user) {
    done(err, user);
  });
});



passport.use('login', new LocalStrategy(
function(username, password, done) {

  console.log("strat used", username, password)



  db.User.findOne({ username: username }, function (err, user) {

    // console.log("dbUserFindone" , user, err)

    
    if (err) { return done(err); console.log("err", err) }
    if (!user) {
      console.log("diffuser")
      
      return done(null, false, { message: 'Incorrect email.' });
    }
    if (user.password != password) {
      console.log("diff password")
      
      return done(null, false, { message: 'Incorrect password.' });
    }

    console.log(user)
    
    return done(null, user);

  });
}
));

passport.use('signup', new LocalStrategy({
  passReqToCallback : true
},
function(req, username, password, done) {

  console.log('un', username, 'pw', password)
  findOrCreateUser = function(){
    // find a user in Mongo with provided username
    db.User.findOne({'username':username},function(err, user) {
      // In case of any error return
      if (err){
        console.log('Error in SignUp: '+err);
        return done(err);
      }
      // already exists
      if (user) {
        console.log('User already exists');
        return done(null, false, 
           req.flash('message','User Already Exists'));
      } else {
        // if there is no user with that email
        // create the user
        var newUser = new db.User()
 
        // // set the user's local credentials
        newUser.username = username;
        newUser.password = password;
        newUser.email = username;

        // save the user
        newUser.save(function(err) {
          if (err){
            console.log('Error in Saving user: '+err);  
            throw err;  
          }
          console.log('User Registration succesful');    
          return done(null, newUser);
        });
      }
    });
  };
   
  // Delay the execution of findOrCreateUser and execute 
  // the method in the next tick of the event loop
  process.nextTick(findOrCreateUser);
})
)










// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
