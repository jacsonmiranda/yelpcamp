var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware");
    
//INDEX - Show all the campgrounds
router.get("/", function(req, res){
    //res.render("campgrounds", {campgrou: campgrounds}); // get from array
    // Get all campgrounds from DB
    Campground.find({}, function(erro, allCampgrounds){
       if(erro){
           console.log("Something went Wrong!");
           console.log(erro);
       } else {
           res.render("campgrounds/index", {campgroundsAdd:allCampgrounds});
       }
    });
});

//CREATE - Add a new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var description = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name: name, price: price, image: image, description: description, author: author};
   //campgrounds.push(newCampground);  
   Campground.create(newCampground, function(erro, newCampground){
       if(erro){
           console.log("Error!!");
        } else {
           // res.render("index", {campgrounds: newCampground});
           res.redirect("/index");
        }
    });
   
});

//NEW - Show form to create new campground 
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//SHOW - Show a specific subject
router.get("/:id", function(req, res){
   //Find the campground with provided ID
   Campground.findById(req.params.id).populate("comments").exec(function(erro, foundCampground){
       if(erro){
           console.log(erro);
       } else {
           console.log(foundCampground);
            res.render("campgrounds/show",{campground: foundCampground});     
       }
   });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampOwer, function(req, res) {
    Campground.findById(req.params.id, function(erros, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
        });
});

//UPDATE CAMPGROUND
router.put("/:id", middleware.checkCampOwer, function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/index");
        } else {
            //redirect somewhere(show page)
            res.redirect("/index/" + req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE  
router.delete("/:id", middleware.checkCampOwer, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/index");
        } else {
            res.redirect("/index");
        }
    });
});

module.exports = router;