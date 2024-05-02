const { asyncerror } = require("../middlewares/asyncerror");
const studentt = require("../models/studentmodels");
const Internship= require("../models/internshipmodel");
const Job = require("../models/jobModel");
const { sendtoken } = require("../utilis/SendToken");
const errorHandler = require("../utilis/errorHandler");
const { sendmail } = require("../utilis/nodemailer");
const path = require("path");
const imagekit = require("../utilis/imagekit").initImageKit()

//components show hoga call back fnc
exports.homepage =  asyncerror(async(req,res,next) =>{
   res.json({message:"Secure homepage!"});
});
// ye show krega jo banda login h 
exports.currentUser =  asyncerror(async(req,res,next) =>{
   const student = await studentt.findById(req.id).exec();
   res.json({student});
});

exports.studentsignup =  asyncerror(async(req,res,next) =>{
   const student = await new studentt(req.body).save();
    sendtoken(student, 201, res);
});
exports.studentsignin =  asyncerror(async(req,res,next) =>{
   const student = await studentt.findOne({email: req.body.email,}).select("+password").exec();

   if(!student)
   return next(
new errorHandler("User not found",404)
);

const isMatch = student.comparepassword(req.body.password);
if(!isMatch) return next(new errorHandler("Wrong credentials",500));
   sendtoken(student,201,res);
});
exports.studentsignout =  asyncerror(async(req,res,next) =>{
   res.clearCookie("token");
   res.json({message:"successfully signout!"})
});

exports.studentsendmail =  asyncerror(async(req,res,next) =>{
   const student = await studentt.findOne({email:req.body.email}).exec();

   if(!student)
   return next(
new errorHandler("User not found with his email address",404)
);

const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`;

sendmail(req,res,next,url);

student. resetpasswordtoken = "1";
await student.save(); 
res.json({student,url});
   
});

exports.studentforgetlink =  asyncerror(async(req,res,next) =>{
   const student = await studentt.findById(req.params.id).exec();

   if(!student)
   return next(
      new errorHandler("User not found with his email address",404)
);



if(student.resetpasswordtoken == "1") {
   student.resetpasswordtoken = "0";
   student.password = req.body.password;
   await student.save();
} else{
   return next(
      new errorHandler("Invalid Reset Password please try again !",500)
      );
}
   
   res.status(200).json({
   message:"password has been successfully changed",
})
   
});

exports.studentresetpassword =  asyncerror(async(req,res,next) =>{
   const student = await studentt.findById(req.params.id).exec();
   student.password = req.body.password;
   await student.save();
   sendtoken(student,201,res);
//    res.status(200).json({
//    message:"password has been successfully changed",
// })
   
});
exports.studentupdate =  asyncerror(async(req,res,next) =>{
   const student = await studentt.findByIdAndUpdate(req.params.id,req.body).exec();
   res.status(200).json({
      success:true,
      message:"Student updated successfully",
      student,
   })
});
exports.studentavtar =  asyncerror(async(req,res,next) =>{
   const student = await studentt.findById(req.params.id).exec();
   const file = req.files.avtar;
   const modifiedName = `resumebuilder.${Date.now()}${path.extname(
      file.name
   )}`;
   // purani wali image dlt hokr new wali image aana chahiye
   if(student.avtar.fileId !== ""){
      await imagekit.deleteFile(student.avtar.fileId);
   }
   const {fileId, url} = await imagekit.upload({
      file:file.data,
      fileName:modifiedName,
   });
   student.avtar = {fileId, url};
   await student.save();
   res.status(200).json({
      success:true,
      message:"Profile updated",
   });
  
});
//--------------apply internship------------
exports.applyinternship =  asyncerror(async(req,res,next) =>{
   const student = await studentt.findById(req.id).exec();
   const internship = await Internship.findById(req.params.internshipid).exec();
   student.internships.push(internship._id);
   internship.student.push(student._id);
   await student.save();
   await internship.save();

   res.json({student,internship});
});
//---------------apply job-------------
exports.applyjob =  asyncerror(async(req,res,next) =>{
   const student = await studentt.findById(req.id).exec();
   const job = await Job.findById(req.params.jobid).exec();
   student.jobs.push(job._id);
   job.student.push(student._id);
   await student.save();
   await job.save();
   res.json({student,job});
});

// debug krne ka way
//res.json(req.body)
// nodemailer is used to send mail
//678907
