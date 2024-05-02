const express = require("express");
const { resume,addeducation,editeducation,deleteeducation,addjobs,editjobs,dltjobs,addinternship,editinternship,dltinternship,addcourses,editcourses,dltcourses,addprojects,editprojects,dltprojects,addskills,editskills,dltskills,addaccomplishments,editaccomplishments,dltaccomplishments} = require("../controllers/resumeControllers");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();


// get /
router.get("/",isAuthenticated,resume);
//post/add-edu
router.post("/add-edu",isAuthenticated,addeducation);
//post
router.post("/edit-edu/:eduid",isAuthenticated,editeducation);
//post
router.post("/dlt-edu/:eduid",isAuthenticated,deleteeducation);
//post/jobs
router.post("/add-jobs",isAuthenticated,addjobs);
//post
router.post("/edit-jobs/:jid",isAuthenticated,editjobs);
//post
router.post("/dlt-jobs/:jid",isAuthenticated,dltjobs);
//-------------internship---------------
//post
router.post("/add-internship",isAuthenticated,addinternship);
//post
router.post("edit-internship/:iid",isAuthenticated,editinternship);
//post
router.post("dlt-internship/:iid",isAuthenticated,dltinternship);

//post
router.post("/add-courses",isAuthenticated,addcourses);
//post
router.post("edit-courses/:cid",isAuthenticated,editcourses);
//post
router.post("dlt-courses/:cid",isAuthenticated,dltcourses);

 //post
router.post("/add-projects",isAuthenticated,addprojects);
//post
router.post("edit-projects/:pid",isAuthenticated,editprojects);
//post
router.post("dlt-projects/:pid",isAuthenticated,dltprojects);


//post
router.post("/add-skills",isAuthenticated,addskills);
//post
router.post("edit-skills/:sid",isAuthenticated,editskills);
//post
router.post("dlt-skills/:sid",isAuthenticated,dltskills);

//post
// router.post("/add-accomplishments",isAuthenticated,addaccomplishments);
// //post
// router.post("edit-accomplishments/:aid",isAuthenticated,editaccomplishments);
// //post
// router.post("dlt-accomplishments/:aid",isAuthenticated,dltaccomplishments);

//post
// router.post("/add-responsibities",isAuthenticated,addresponsibities);
//post
// router.post("edit-responsibities/:rid",isAuthenticated,editresponsibities);
// //post
// router.post("dlt-responsibities/:rid",isAuthenticated,dltresponsibities);


module.exports= router;
