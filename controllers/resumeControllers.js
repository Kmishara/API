const { asyncerror } = require("../middlewares/asyncerror");
const studentt = require("../models/studentmodels");
const { v4: uuidv4 } = require('uuid');
const errorHandler = require("../utilis/errorHandler");
const student = require("../models/studentmodels");

exports.resume =  asyncerror(async(req,res,next) =>{
    const {resume} = await studentt.findById(req.id).exec();
    res.json({message:"Secure resumepage!",resume});
 });
 exports.addeducation =asyncerror(async(req,res,next) =>{
    const student= await studentt.findById(req.id).exec();
   student.resume.education.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:"education Added!"});
    //uuid random id generated -- this is a npm paccakage
 });
 //editeducation
 exports.editeducation =asyncerror(async(req,res,next) =>{
    const student= await studentt.findById(req.id).exec();
    // agr hmara id or resume ka id = ho to usko eduindex p save kr dege
    const eduIndex = student.resume.education.findIndex((i)=> i.id === req.params.eduid
    );
    // purane wale data ko or updated data ko show
   student.resume.education[eduIndex]={...student.resume.education[eduIndex],...req.body};

    await student.save();
    res.json({message:"education updated!"});
    
 });
 //deleteeducation
 exports.deleteeducation =asyncerror(async(req,res,next) =>{
    const student= await studentt.findById(req.id).exec();
    //return sirf vo krna h jiski id match nhi kr rhi h eduid se
        const filterededu = student.resume.education.filter((i)=> i.id !== req.params.eduid
    );
   student.resume.education= filterededu;
   await student.save();
    res.json({message:"education updated!"});
});
 //------------jobs-----------------
 exports.addjobs =asyncerror(async(req,res,next) =>{
    const student= await studentt.findById(req.id).exec();
   student.resume.jobs.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:"jobs Added!"});
    //uuid random id generated -- this is a npm paccakage
 });
 exports.editjobs =asyncerror(async(req,res,next) =>{
    const student= await studentt.findById(req.id).exec();
    // agr hmara id or resume ka id = ho to usko eduindex p save kr dege
    const jIndex = student.resume.jobs.findIndex((i)=> i.id === req.params.jid
    );
    // purane wale data ko or updated data ko show
   student.resume.jobs[jIndex]={...student.resume.jobs[jIndex],...req.body};
   await student.save();
    res.json({message:"jobs updated!"});
    
 });
//deletejob
exports.dltjobs =asyncerror(async(req,res,next) =>{
   const student= await studentt.findById(req.id).exec();
   //return sirf vo krna h jiski id match nhi kr rhi h eduid se
       const filteredjob = student.resume.jobs.filter((i)=> i.id !== req.params.jid
   );
     student.resume.education= filteredjob;

   await student.save();
   res.json({message:"jobs deleted"});
   
});

//-------------internship-----------------
 exports.addinternship =asyncerror(async(req,res,next) =>{
   const student= await studentt.findById(req.id).exec();
  student.resume.internships.push({...req.body, id:uuidv4()});
   await student.save();
   res.json({message:"internship Added!"});
   //uuid random id generated -- this is a npm paccakage
});
// editeducation
exports.editinternship =asyncerror(async(req,res,next) =>{
   const student= await studentt.findById(req.id).exec();
   // agr hmara id or resume ka id = ho to usko eduindex p save kr dege
   const iIndex = student.resume.internships.findIndex((i)=> i.id === req.params.iid
   );
   // purane wale data ko or updated data ko show
  student.resume.internships[eduIndex]={...student.resume.internships[iIndex],...req.body};

   await student.save();
   res.json({message:"internships updated!"});
   
});
//deleteeducation
exports.dltinternship =asyncerror(async(req,res,next) =>{
   const student= await studentt.findById(req.id).exec();
   //return sirf vo krna h jiski id match nhi kr rhi h eduid se
       const filteredi = student.resume.internships.filter((i)=> i.id !== req.params.iid
   );
     student.resume.internships= filteredi;

   await student.save();
   res.json({message:"internships updated!"});
   
});



//----------------courses---------
exports.addcourses =asyncerror(async(req,res,next) =>{
   const student= await studentt.findById(req.id).exec();
  student.resume.courses.push({...req.body, id:uuidv4()});
   await student.save();
   res.json({message:"courses Added!"});
   //uuid random id generated -- this is a npm paccakage
});
//editcourses
exports.editcourses =asyncerror(async(req,res,next) =>{
   const student= await studentt.findById(req.id).exec();
   // agr hmara id or resume ka id = ho to usko eduindex p save kr dege
   const cIndex = student.resume.courses.findIndex((i)=> i.id === req.params.cid
   );
   // purane wale data ko or updated data ko show
  student.resume.courses[cIndex]={...student.resume.courses[cIndex],...req.body};

   await student.save();
   res.json({message:"courses updated!"});
   
});
//deletecourses
exports.dltcourses =asyncerror(async(req,res,next) =>{
   const student= await studentt.findById(req.id).exec();
   //return sirf vo krna h jiski id match nhi kr rhi h eduid se
       const filteredc = student.resume.courses.filter((i)=> i.id !== req.params.cid
   );
     student.resume.courses= filteredc;

   await student.save();
   res.json({message:"courses updated!"});
   
});



//-------------projects--------------------
exports.addprojects =asyncerror(async(req,res,next) =>{
   const student= await studentt.findById(req.id).exec();
  student.resume.projects.push({...req.body, id:uuidv4()});
   await student.save();
   res.json({message:"projects Added!"});
   //uuid random id generated -- this is a npm paccakage
});
//editeducation
exports.editprojects =asyncerror(async(req,res,next) =>{
   const student= await studentt.findById(req.id).exec();
   // agr hmara id or resume ka id = ho to usko eduindex p save kr dege
   const pIndex = student.resume.projects.findIndex((i)=> i.id === req.params.pid
   );
   // purane wale data ko or updated data ko show
  student.resume.projects[eduIndex]={...student.resume.projects[pIndex],...req.body};

   await student.save();
   res.json({message:"projects updated!"});
   
});
//deleteeducation
exports.dltprojects =asyncerror(async(req,res,next) =>{
   const student= await studentt.findById(req.id).exec();
   //return sirf vo krna h jiski id match nhi kr rhi h eduid se
       const filteredp = student.resume.projects.filter((i)=> i.id !== req.params.pid
   );
     student.resume.education= filteredp;

   await student.save();
   res.json({message:"projects updated!"});
   
});


// //---------------skills----------------------
exports.addskills =asyncerror(async(req,res,next) =>{
   const student= await studentt.findById(req.id).exec();
  student.resume.skills.push({...req.body, id:uuidv4()});
   await student.save();
   res.json({message:"skills Added!"});
   //uuid random id generated -- this is a npm paccakage
});
// //editskills
exports.editskills =asyncerror(async(req,res,next) =>{
   const student= await studentt.findById(req.id).exec();
   // agr hmara id or resume ka id = ho to usko eduindex p save kr dege
   const sIndex = student.resume.skills.findIndex((i)=> i.id === req.params.sid
   );
   // purane wale data ko or updated data ko show
  student.resume.skills[sIndex]={...student.resume.skills[sIndex],...req.body};

   await student.save();
   res.json({message:"skills updated!"});
   
});
// //deleteskills
exports.dltskills =asyncerror(async(req,res,next) =>{
   const student= await studentt.findById(req.id).exec();
   //return sirf vo krna h jiski id match nhi kr rhi h eduid se
       const filteres = student.resume.skills.filter((i)=> i.id !== req.params.sid
   );
     student.resume.skills= filteres;

   await student.save();
   res.json({message:"skills updated!"});
   
});


// //--------------accomplishments-----------------
exports.addaccomplishments =asyncerror(async(req,res,next) =>{
   const student= await studentt.findById(req.id).exec();
  student.resume.accomplishments.push({...req.body, id:uuidv4()});
   await student.save();
   res.json({message:"accomplishments Added!"});
   //uuid random id generated -- this is a npm paccakage
});
// //editaccomplishments
// exports.editaccomplishments =asyncerror(async(req,res,next) =>{
//    const student= await studentt.findById(req.id).exec();
//    // agr hmara id or resume ka id = ho to usko eduindex p save kr dege
//    const aIndex = student.resume.accomplishments.findIndex((i)=> i.id === req.params.aid
//    );
//    // purane wale data ko or updated data ko show
//   student.resume.accomplishments[aIndex]={...student.resume.accomplishments[aIndex],...req.body};

//    await student.save();
//    res.json({message:"accomplishments updated!"});
   
// });
//deleteaccomplishments
// exports.deleteaccomplishments =asyncerror(async(req,res,next) =>{
//    const student= await studentt.findById(req.id).exec();
//    //return sirf vo krna h jiski id match nhi kr rhi h eduid se
//        const filtereda = student.resume.accomplishments.filter((i)=> i.id !== req.params.aid
//    );
//      student.resume.accomplishments= filtereda;

//    await student.save();
//    res.json({message:"accomplishments updated!"});
   
// });


//-----------------responsibilities---------------
// exports.addresponsibities =asyncerror(async(req,res,next) =>{
//    const student= await studentt.findById(req.id).exec();
//   student.resume.responsibilities.push({...req.body, id:uuidv4()});
//    await student.save();
//    res.json({message:"responsibilities Added!"});
//    //uuid random id generated -- this is a npm paccakage
// });
// // //editresponsibilities
// exports.editresponsibilities =asyncerror(async(req,res,next) =>{
//    const student= await studentt.findById(req.id).exec();
//    // agr hmara id or resume ka id = ho to usko eduindex p save kr dege
//    const rIndex = student.resume.responsibilities.findIndex((i)=> i.id === req.params.rid
//    );
//    // purane wale data ko or updated data ko show
//   student.resume.responsibilities[rIndex]={...student.resume.responsibilities[rIndex],...req.body};

//    await student.save();
//    res.json({message:"responsibilities updated!"});
   
// });
// //deleteresponsibilities
// exports.deleteresponsibilities =asyncerror(async(req,res,next) =>{
//    const student= await studentt.findById(req.id).exec();
//    //return sirf vo krna h jiski id match nhi kr rhi h rid se
//        const filteredr = student.resume.responsibilities.filter((i)=> i.id !== req.params.rid
//    );
//      student.resume.responsibilities= filteredr;

//    await student.save();
//    res.json({message:"responsibilities updated!"});
   
// });

 // student curd operations
 //apply any one student for internor job
 // update resume if he or she want--resume controllers
 // employe curd operations