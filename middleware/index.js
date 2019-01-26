var Campground = require("../models/campground");
var Comment = require("../models/comment");

//all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampOwer = function (req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(erros, foundCampground){
            if(erros){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
               //does user own the campground?
               //consele.log(foundCampground); MONGOOSE OBJECT
               //consele.log(req.user._id);    STRING
               if(foundCampground.author.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash("error", "You don't have permission to do that");
                   res.redirect("back");
               }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
         res.redirect("back");
    }
};

middlewareObj.checkCommentOwer = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(erros, foundComment){
            if(erros){
                res.redirect("back");
            } else {
               //does user own the comment?
               //consele.log(foundComment); MONGOOSE OBJECT
               //consele.log(req.user._id);    STRING
               if(foundComment.author.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash("error", "You don't have permission to do that");
                   res.redirect("back");
               }
            }
        });
    } else {
         req.flash("error", "You need to be logged in to do that!");
         res.redirect("back");
    }
};

//middleware
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
};

module.exports = middlewareObj;