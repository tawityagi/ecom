const express = require('express');
const router = express.Router();

const User = require('./../connection/db.js');

//ROUTES FOR ALL Users 
router.get("/", (req,res,next) => {
    User.find( (err,foundUsers) => {
        if(err){
            res.statusCode = 200;
            return res.send(err);
        } else{
            return res.send(foundUsers);
        }
    })
})
router.post("/", (req,res,next) => {
    const newUser = new User({
        name: req.body.name,
        email:req.body.email,
        phone: req.body.phone,
        age: req.body.age
    });
    
    User.findOne(
        {email: req.body.email}, 
        (err,foundUser) => {
            if(foundUser){
                return res.status(409).send({
                    message: 'This email is already in use!'
                });
            } else if(err){
                res.send(err);
            }
            else{
                newUser.save( (er) => {
                    if(er){
                        res.send(er);
                    } else{ 
                        res.statusCode = 201;
                        res.send({ message: 'Successfully saved!' });
                    }
                });
            }
    });
})
router.delete("/", (req,res,next) => {
    User.deleteMany( (err) => {
        if(err){
            res.statusCode = 200;
            return res.send(err);
        } else{
            return res.send({ message: "Successfully deleted all Users!" } );
        }
    })
});

//ROUTES FOR A SPECIFIC User
router.get("/:email", (req,res,next) => {
    User.findOne(
        {email: req.params.email}, 
        (err,foundUser) => {
            if(foundUser){
                res.statusCode = 200;
                return res.send(foundUser);
            } else{
                return res.send({ message: "No User found!" } );
            }
    });
})
router.put("/:email", (req,res,next) =>  {
    User.findOneAndUpdate(
        {email: req.params.email}, 
        {phone: req.body.phone}, 
        (err) => {
            if(err){
                return res.send(err);
            } else{
                res.statusCode = 200;
                return res.send({ message: "Successfully updated!" } );
            }
        }
    );
})
router.patch("/:email", (req,res,next) => {
    User.updateOne(
        {email: req.params.email},
        {$set : req.body},
        (err) => {
            if(err){
                res.send(err);
            } else{
                res.statusCode = 200;
                return res.send({ message: "Successfully updated!" } );
            }
        }
    );
})
router.delete("/:email", (req,res,next) =>  {
    User.findOne(
        {email: req.params.email}, 
        (err,foundUser) => {
            if(foundUser){
                User.remove(
                    {email: req.params.email}, 
                    (er) => {
                        if(er)
                            return res.send(er);
                        else{
                            res.statusCode = 200;
                            return res.send({ message: "Successfully deleted" } );
                    }
                })
            } 
            else{
                return res.send({ message: "User not found!" } );
            }
    })
});

//Add to cart option
router.put("/:email/addBook/cart", (req,res,next) =>  {
    if(req.body.count == '0' || req.body.count == 0){
        User.updateOne(
            {email: req.params.email}, 
            { $pull: { cart :{isbn: req.body.isbn} } },
            (err) => {
                if(err){
                    return res.send(err);
                } else{
                    return res.send({ message: "Count was zero, Successfully removed from cart" } );
                }
            }
        );
    }else{
    User.findOne(
        {email: req.params.email}, 
        (err,foundUser) => {
            if(foundUser){
                res.statusCode = 200;
                var cartArr = foundUser.cart;
                var hasMatch =false;

                for (var index = 0; index < cartArr.length; ++index) {

                    var value = cartArr[index];

                    if(value.isbn == req.body.isbn){
                        hasMatch = true;
                        // console.log("Item found in cart");
                        
                        User.findOneAndUpdate(
                            {email: req.params.email},
                            {$set: {"cart.$[e1].count" : req.body.count } },
                            { 
                                arrayFilters: [
                                    {"e1._id" : value._id}
                                ],
                            }, 
                            (err,found) => {
                                if(found){
                                    return res.send({ message: "Successfully added to cart" } );
                                } else{
                                    return res.send({ message: "isbn not found !" } );
                                }
                        });
                        break;
                    }
                }
                if(hasMatch == false){
                    // console.log("Not Found");
                    User.findOneAndUpdate(
                        {email: req.params.email}, 
                        { $addToSet: { cart: req.body } }, 
                        (err) => {
                            if(err){
                                return res.send(err);
                            } else{
                                return res.send({ message: "Successfully added to cart" } );
                            }
                        }
                    );
                }
            } else{
                return res.send({ message: "No User found!" } );
            }
    });
}
})

router.put("/:email/removeBook/cart", (req,res,next) =>  {
    User.updateOne(
        {email: req.params.email}, 
        { $pull: { cart :{isbn: req.body.isbn} } },
        (err) => {
            if(err){
                return res.send(err);
            } else{
                res.statusCode = 200;
                return res.send({ message: "Successfully removed from cart" } );
            }
        }
    );
})

//Add to wishlist
router.put("/:email/addBook/wishlist", (req,res,next) =>  {
    User.findOneAndUpdate(
        {email: req.params.email}, 
        { $addToSet: { wishlist: req.body.isbn } }, 
        (err,foundUser) => {
            if(err){
                return res.send(err);
            } if(foundUser){
                res.statusCode = 200;
                return res.send({ message: "Successfully added to wishlist" } );
            } else{
                res.statusCode = 401;
                return res.send({ message: "User not found" } );
            }
        }
    );
})
router.put("/:email/removeBook/wishlist", (req,res,next) =>  {
    User.findOneAndUpdate(
        {email: req.params.email}, 
        { $pull: { wishlist: req.body.isbn } }, 
        (err,foundUser) => {
            if(err){
                return res.send(err);
            } if(foundUser) {
                res.statusCode = 200;
                return res.send({ message: "Successfully removed from wishlist" } );
            } else{
                res.statusCode = 401;
                return res.send({ message: "User not found" } );
            }
        }
    );
})
module.exports = router;