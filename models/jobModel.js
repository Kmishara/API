const mongoose = require("mongoose")

const jobModel = new mongoose.Schema({
    student: [{type:mongoose.Schema.Types.ObjectId,ref:"student"}],
    // is line ka mtlb kisne bnaya h isko
    employe: {type:mongoose.Schema.Types.ObjectId,ref:"employe"},
    title: String,
    skill:String,   
    jobtype:{
        type: String,
        enum:["In office","Remote"]
    },
    openings:Number,
    description:String,
    preference:String,
    perks:String,
    salary:Number,
    assements:String,
},

{ timestamps: true}
);


const Job = mongoose.model("Job",jobModel);
module.exports = Job;
