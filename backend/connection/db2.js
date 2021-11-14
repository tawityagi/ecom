require("dotenv").config()
const mongoose =require("mongoose")

mongoose.connect(process.env.URL , { useNewUrlParser: true,  useUnifiedTopology:true});

const bookSchema =new mongoose.Schema({
    title: String,
    version: String,
    publication: String,
    pageCount : Number,
    thumbnailUrl: String,
    shortDescription: String,
    longDescription: {
        type:String,
        default: "NA"
    },
    status: String,
    authors : {
        type: [String], default: []
    },
    isbn: {
        type: String, 
        required: true
    },
    rating:  {
        type: Number, 
        default: 0
    },
    category: {
        type: [String], default: ["Miscellaneous"]
    },
},
{timestamps: true}
)

bookSchema.index({title: 'text'});

const Book= mongoose.model("Book",bookSchema);

module.exports = Book;
