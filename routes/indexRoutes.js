// routes folder route ko show krta h 

const express = require("express");
const { homepage,currentUser, studentsignup , studentsignin, studentsignout,studentsendmail,studentforgetlink,studentresetpassword,studentupdate,studentavtar,applyinternship,applyjob } = require("../controllers/indexControllers");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();


// get /
router.get("/",homepage);

// post /student
router.post("/student",isAuthenticated ,currentUser);

// post /student/signup
router.post("/student/signup",studentsignup);

// post /student/signin
router.post("/student/signin",studentsignin);

// get /student/signout
router.get("/student/signout",isAuthenticated,studentsignout);

// post/student/send-mail
router.post("/student/send-mail",studentsendmail);

// get/student/forget-link/student id
router.get("/student/forget-link/:id",studentforgetlink);

// post/student/reset-password/student id

router.post("/student/reset-password/:id",isAuthenticated,studentresetpassword);
// post/student/update/student id
router.post("/student/update/:id",isAuthenticated,studentupdate);
// post/student/avtar/student id
router.post("/student/avtar/:id",isAuthenticated,studentavtar);

//-----------apply internship---------------
// post/student/apply/internshipid
router.post("/student/apply/internship/:internshipid",isAuthenticated,applyinternship);

//-----------apply jobs--------------
// post/student/apply/job id
router.post("/student/apply/job/:jobid",isAuthenticated,applyjob);

module.exports= router;
