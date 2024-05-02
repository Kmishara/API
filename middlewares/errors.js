exports.genetatedErrors = (err,req,res,next)=>{
    //bs msg nikalana h
    const statusCode = err.statusCode || 500;
     
    if(
        err.name === "MongoServerError" && err.message.includes("E11000 duplicate key")
    ){
        err.message = "email is already exists";
    }

    res.status(statusCode).json({
        message:err.message,
        errName: err.name,
        // stack:err.stack,
    });
};