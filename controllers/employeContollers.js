const { asyncerror } = require("../middlewares/asyncerror");
// const Employe = require("../models/employemodels");
const Employe = require("../models/employemodel");
const Internship = require("../models/internshipmodel");
const Job = require("../models/jobModel");

const { sendtoken } = require("../utilis/SendToken");
const errorHandler = require("../utilis/errorHandler");
const { sendmail } = require("../utilis/nodemailer");
const path = require("path");
const imagekit = require("../utilis/imagekit").initImageKit()

//components show hoga call back fnc
exports.homepage =  asyncerror(async(req,res,next) =>{
   res.json({message:"Secure employe homepage!"});
});
// // ye show krega jo banda login h 
exports.currentEmploye =  asyncerror(async(req,res,next) =>{
   const employe = await Employe.findById(req.id).exec();
   res.json({employe});
});

 exports.employesignup =  asyncerror(async(req,res,next) =>{
   const employe = await new Employe(req.body).save();
    sendtoken(employe, 201, res);
});
exports.employesignin =  asyncerror(async(req,res,next) =>{
   const employe = await Employe.findOne({email: req.body.email,}).select("+password").exec();

   if(!employe)
   return next(
new errorHandler("User not found",404)
);

const isMatch = employe.comparepassword(req.body.password);
if(!isMatch) return next(new errorHandler("Wrong credentials",500));
   sendtoken(employe,201,res);
});
exports.employesignout =  asyncerror(async(req,res,next) =>{
   res.clearCookie("token");
   res.json({message:"successfully signout!"})
});

exports.employesendmail =  asyncerror(async(req,res,next) =>{
   const employe = await Employe.findOne({email:req.body.email}).exec();

   if(!employe)
   return next(
new errorHandler("User not found with his email address",404)
);

 const url = `${req.protocol}://${req.get("host")}/forget-link/${employe._id}`;

 sendmail(req,res,next,url);

employe. resetpasswordtoken = "1";
await employe.save(); 
res.json({employe,url});
   
});

exports.employeforgetlink =  asyncerror(async(req,res,next) =>{
   const employe = await Employe.findById(req.params.id).exec();

   if(!employe)
   return next(
      new errorHandler("User not found with his email address",404)
);



if(employe.resetpasswordtoken == "1") {
   employe.resetpasswordtoken = "0";
   employe.password = req.body.password;
   await employe.save();
} else{
   return next(
      new errorHandler("Invalid Reset Password please try again !",500)
      );
}
   
   res.status(200).json({
   message:"password has been successfully changed",
})
   
});

exports.employeresetpassword =  asyncerror(async(req,res,next) =>{
   const employe = await Employe.findById(req.params.id).exec();
   employe.password = req.body.password;
   await employe.save();
   sendtoken(employe,201,res);
//    res.status(200).json({
//    message:"password has been successfully changed",
// })
   
});
exports.employeupdate =  asyncerror(async(req,res,next) =>{
   const employe = await Employe.findByIdAndUpdate(req.params.id,req.body).exec();
   res.status(200).json({
      success:true,
      message:"employe updated successfully",
      employe,
   })
});
exports.employecompanylogo =  asyncerror(async(req,res,next) =>{
   const employe = await Employe.findById(req.params.id).exec();
   const file = req.files.companylogo;
   const modifiedName = `resumebuilder.${Date.now()}${path.extname(
      file.name
   )}`;
   // purani wali image dlt hokr new wali image aana chahiye
   if(employe.companylogo.fileId !== ""){
      await imagekit.deleteFile(employe.companylogo.fileId);
   }
   const {fileId, url} = await imagekit.upload({
      file:file.data,
      fileName:modifiedName,
   });
   employe.companylogo = {fileId, url};
   await employe.save();
   res.status(200).json({
      success:true,
      message:"Profile updated",
   });
  
});
//--------------internship------------------
exports.createinternship =  asyncerror(async(req,res,next) =>{
   const employe = await Employe.findById(req.id).exec();
   const internship = await new Internship(req.body);
   internship.employe = employe._id;
   employe.internships.push(internship._id);
   await internship.save();
   await employe.save();
   res.status(201).json({success:true,internship});
});

exports.readinternship =  asyncerror(async(req,res,next) =>{

   const {internships} = await Employe.findById(req.id)
.populate("internships").exec();
    // jitni bhi internship bnaye gye h vo sb yaha milega
    res.status(200).json({success:true,internships});
});

exports.readsingleinternship =  asyncerror(async(req,res,next) =>{
   const internship = await Internship.findById(req.params.id).exec();
    
    res.status(200).json({success:true,internship});
});

//--------------job------------------
exports.createjob =  asyncerror(async(req,res,next) =>{
   const employe = await Employe.findById(req.id).exec();
   const job = await new Job(req.body);
   job.employe = employe._id;
   employe.jobs.push(job._id);
   await job.save();
   await employe.save();
   res.status(201).json({success:true,job});
});

exports.readjob =  asyncerror(async(req,res,next) =>{
// const {jobs} = await Employe.find()
// console.log(jobs);
//     // jitni bhi internship bnaye gye h vo sb yaha milega
//     res.status(200).json({success:true,jobs});

    const {jobs} = await Employe.findById(req.id).populate("jobs").exec();

    // jitni bhi internship bnaye gye h vo sb yaha milega
    res.status(200).json({success:true,jobs});
   
});

exports.readsinglejob =  asyncerror(async(req,res,next) =>{
   const job = await Job.findById(req.params.id).exec();
   res.status(200).json({success:true,job});
});

// debug krne ka way
//res.json(req.body)
// nodemailer is used to send mail
//678907