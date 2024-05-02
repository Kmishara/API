// async error ko handler krne k liye
//ye fnc isliye bnaye h qki try catch 10 bar nhi likhna ho bs har bar fnc ka name ko export kr do
exports.asyncerror = (func) => (req,res,next) =>{
    Promise.resolve(func(req,res,next)).catch(next);
};