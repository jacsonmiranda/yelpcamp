var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "São Leopoldo",
        image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcbebfe204ad7e04d558d7e0cbc0d2eb&auto=format&fit=crop&w=500&q=60",
        description:"A beautifull city"
    },
    {
        name: "Canoas",
        image: "https://images.unsplash.com/photo-1525209149972-1d3faa797c3c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=053f91dd9aee1cc7bc5cafca28cb625c&auto=format&fit=crop&w=500&q=60",
        description:"A city"
    },
    {
        name: "Porto Alegre",
        image: "https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=806fc4197fbc5dc5f67c87e4284691fb&auto=format&fit=crop&w=500&q=60",
        description:"A gay city"
    }    
]
//REMOVE ALL CAMPGROUNDS
function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("removed campgrounds!");
            //ADD A FEW CAMPGROUNDS
            data.forEach(function(seed){
                Campground.create(seed, function(err, campgroundCreated){
                    if(err){
                        console.log(err);
                        console.log("erroooooooooo");
                    }else{
                        console.log("added a campground!!");
                        //CREATE A COMMENT
                        Comment.create(
                            {
                                text: "This is a place where you can find peace, and you can be free for your wild life",
                                author: "Jacson"
                            }, function(erro, campgroundsComment){
                                if(erro){
                                    console.log(erro);
                                } else {
                                    campgroundCreated.comments.push(campgroundsComment);
                                    campgroundCreated.save();
                                    console.log("comment added!");
                                    console.log(campgroundsComment);
                                }
                            });
                    }
                });
            });
        }
    });
   
}

module.exports = seedDB;