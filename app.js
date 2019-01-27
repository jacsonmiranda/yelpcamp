var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    flash          = require("connect-flash"), 
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seeds");

//requiring routes
var commentsRoutes   = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")
console.log(process.env.DATABASEURL);
//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://localhost:27017/yelp_camp_12_Deployed", { useNewUrlParser: true });
//mongoose.connect('mongodb://jacsonmiranda:Jacson123@ds113495.mlab.com:13495/yelpcampdatabase', { useNewUrlParser: true });
//mongoose.connect(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//console.log(__dirname);

//seedDB(); Seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/",indexRoutes);
app.use("/index",campgroundRoutes);
app.use("/index/:id/comments",commentsRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp has started!!");
}); 