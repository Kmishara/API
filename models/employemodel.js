const mongoose = require("mongoose")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const employemodel = new mongoose.Schema({
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
    companylogo:{
        type:Object,
        default:{
            fileId:"",
            url:"https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg",
        },
    },
    companyname:{
        type: String,
        minlength: [4,"companyname should have atleast 4 characters"],
        required:[true,"companyname is required"],
       
    },
    contact:{
        type: String,
        maxlength: [10,"contact should not exceed more than 10 characters"],
        minlength: [10,"contact should have atleast 10 characters"],
        required:[true,"contact is required"],
       },
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
   internships:[{
    type:mongoose.Schema.Types.ObjectId,ref:"internship"
   }],
jobs:[{
    type:mongoose.Schema.Types.ObjectId,ref:"Job"
}]
},

{ timestamps: true}
);

employemodel.pre("save",function(){

    if(!this.isModified("password")){
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password,salt);
});
// password compare
employemodel.methods.comparepassword = function (password){
    return bcrypt.compareSync(password,this.password);
};
// generate token
employemodel.methods.getjwttoken = function (){
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}
// const employe = mongoose.model("employe",employemodel);
// module.exports = employe;
module.exports = mongoose.model("employe",employemodel);

