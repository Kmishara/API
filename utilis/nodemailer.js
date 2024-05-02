const nodemailer = require("nodemailer");
const errorHandler = require("./errorHandler");


exports.sendmail=(req,res,next,url)=>{
    const transport = nodemailer.createTransport({
        service: 'gmail',
        host:"smtp.gmail.com",
        port: "465",
        auth: {
          user: process.env.Email_address,
          pass: process.env.Email_password
        }
    });


    const mailOptions = {
        from: "Master Pvt. Ltd.",
        to: req.body.email,
        subject: "password Reset Link",
        // text:"Do not share this link to anyone",
        html: `<h1>Click link below to reset password </h1> <a href ="${url}">password Reset Link </a>`,
    };
   transport.sendMail(mailOptions,(err,info)=>{
    if(err)  return next(new errorHandler(err,500));
    console.log(info);
    return res.status(200).json({
        message:"email sent successfully",
        url,
    })
   });
}

// generate password
// email
// setings
// manage ur acc
// Security 
// app
//  password
//  custom
//  ghbn
//  password generate