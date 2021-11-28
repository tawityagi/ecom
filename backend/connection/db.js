require("dotenv").config()
const mongoose =require("mongoose")

mongoose.connect(process.env.URL  , { useNewUrlParser: true,  useUnifiedTopology:true});

const userSchema =new mongoose.Schema({
    name: String,
    email: {
        type: String, 
        required: true
    },
    phone: Number,
    age: Number,
    address: {
        flatNo: String,
        area: String,
        addressline1: String,
        addressline2: String,
        landmark: String,
        addressType: String,
        pincode: Number,
        district: String,
        state: String
    },
    isAdmin: {
        type: Boolean, 
        required: true, 
        default: false
    },
    wishlist: {
        type:[String],
        default: []
    },
    cart: [{
        isbn: String,
        count: Number
    }],
    orders:  {
        type:[String],
        default: []
    },
})

const User= mongoose.model("User",userSchema);

module.exports = User;