const mongoose = require("mongoose")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const studentmodel = new mongoose.Schema({
    firstname:{
        type: String,
        minlength: [4,"firstname should have atleast 4 characters"],
        required:[true,"firstname is required"],
       
    },
   
    lastname:{
        type: String,
        minlength: [4,"lastname should have atleast 4 characters"],
        required:[true,"lastname is required"],
    },
    avtar:{
        type:Object,
        default:{
            fileId:"",
            url:"https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg",
        },
    },
    contact:{
        type: String,
        maxlength: [10,"contact should not exceed more than 10 characters"],
        minlength: [10,"contact should have atleast 10 characters"],
        required:[true,"contact is required"],
       },
    city:{
        type: String,
        minlength: [3,"contact should have atleast 3 characters"],
        required:[true,"contact is required"],
       },
    gender:{type:String, enum: ["Male", "Female", "others"]},
    email:{
        type: String,
        unique:true,
        required:[true,"email is required"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address',],
    },
    password:{
        type: String,
        select:false,
        minlength: [6,"password should have atleast 6 characters"],
        maxlength: [15,"password should not exceed more than 15 characters"],
        // match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,'invalid'],
    },
    resetpasswordtoken:{
        type: String,
        default:"0",
    },
    resume:{
        education:[],
        jobs:[],
        internships:[],
       responsibilities:[],
        courses:[],
        projects:[],
        skills:[],
        accomplishments:[],
},
internships:[{
    type:mongoose.Schema.Types.ObjectId,ref:"internship"
   }],
jobs:[{
    type:mongoose.Schema.Types.ObjectId,ref:"job"
}]
},

{ timestamps: true}
);
//bcrypt pswd
studentmodel.pre("save",function(){

    if(!this.isModified("password")){
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password,salt);
});
// password compare
studentmodel.methods.comparepassword = function (password){
    return bcrypt.compareSync(password,this.password);
};
// generate token
studentmodel.methods.getjwttoken = function (){
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}
const student = mongoose.model("student",studentmodel);
module.exports = student;
// timestamps means automatic real time aata h 
// select:false -- jb hm find ya find one kr ke search kre to password bhi show na kre

// student signin m hmlg comapre kiye ki useraname or password same h ki nhi 
// imagekit-- image upload krne ki functionality ko provide krna
//fileuploader-- upload krne ke liye just eg we use multer in previously