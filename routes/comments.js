var express    = require("express"),
    router     = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    middleware = require("../middleware");
//comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(erro, campgrou){
       if(erro){
           console.log(erro);
       } else {
            res.render("comments/new", {campground: campgrou});           
       }
    });
});

//comments create
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(erro, campground) {
        if(erro){
            console.log(erro);
            res.redirect("/index");
        } else {
            Comment.create(req.body.comment, function(erro, comment){
            if(erro){
                console.log(erro);
            } else {
                //add username and id to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                //save comment
                comment.save();
                campground.comments.push(comment);
                campground.save();
                   req.flash("success", "Successufully added comment!");
                res.redirect('/index/' + campground._id);
            }
        });
       }
    });
});

//COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwer, function(req, res){
    Comment.findById(req.params.comment_id, function(erro, foundComment) {
        if(erro){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comments: foundComment});
        }
    });
});
//COMMENTS UPDATE
router.put("/:comment_id", middleware.checkCommentOwer, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comments, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/index/"+ req.params.id);
        }
    });
});
// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwer, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("error", "Comment deleted!");
            res.redirect("/index/" + req.params.id);
        }
    });
});

module.exports = router;