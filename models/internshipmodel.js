const mongoose = require("mongoose")

const internshipmodel = new mongoose.Schema({
    student: [{type:mongoose.Schema.Types.ObjectId,ref:"student"}],
    // is line ka mtlb kisne bnaya h isko
   employe: {type:mongoose.Schema.Types.ObjectId,ref:"employe"},
    profile: String,
    skill:String,   
   
    internshiptype:{
        type: String,
        enum:["In office","Remote"]
    },
    openings:Number,
    from:String,
    to:String,
    duration:String,
    responsibility:String,
    stipend:{
        status:{
            type:String,
            enum:["Fixed","Negotiable","Performance based","Unpaid"]
    },
    amount: Number,

},
perks:String,
assements:String,
},

{ timestamps: true}
);


const Internship = mongoose.model("internship",internshipmodel);
module.exports = Internship;
