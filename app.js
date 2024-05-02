require("dotenv").config({ path: "./.env"});
const express = require("express");
const app = express();


//db connection
require("./models/database").connectDatabase();
//cors -- connected be to fe
const cors= require("cors");
app.use(cors({credentials:true,origin:true}));
//hme pte chle ki route hit hua h isliye hme morgan ko save/initialized krna hoga
const logger = require("morgan");
app.use(logger("tiny"));
//bodyparser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// session and cookie

const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret: process.env.Express_Session_Secret
})
);

app.use(cookieparser());


// express file-upload
const fileupload = require("express-fileupload");
app.use(fileupload());

// routes
app.use("/user", require("./routes/indexRoutes"));
app.use("/resume", require("./routes/resumeRoutes"));
app.use("/employe", require("./routes/employeRoutes"));

// error handling
const {genetatedErrors} = require("./middlewares/errors");
const ErrorHandler = require("./utilis/errorHandler");
app.all("*",(req,res,next)=>{
    next(new ErrorHandler(`requested url not found ${req.url}`,404));
});
app.use(genetatedErrors);

app.listen(process.env.PORT, console.log(`server running on port ${process.env.PORT}`));

//bodyparser
//req.body ko activate krta h 
// req.body ko activate krne k liye hme bodyparse ko activate krna hoga
// or bodyparser ko activate krne k liye express se milta
// routes se phle initialize hota h 
// cookie - ek code generate krte h backend m us code ko ap browser m jakr save kr dete h jb tk vo code browser m rhega tb tk vo save rhega code ko hm log check krte rhte h ki expire hua to nhi agr vo expire ho gya h to bolte h session is out
// browswer m ek string save hoti h vo ek token hoti h 

