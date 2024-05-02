// routes folder route ko show krta h 

const express = require("express");
// const { homepage
//     // currentUser, employesignup , employesignin, employesignout,employesendmail,employeforgetlink,employeresetpassword,employeupdate,employeavtar
//  } = require("../controllers/employeControllers");

const {homepage,currentEmploye,employesignup,employesignin,employesignout,employecompanylogo,employeforgetlink,employesendmail,employeupdate,employeresetpassword,createinternship,readinternship,readsingleinternship,createjob,readjob,readsinglejob} = require("../controllers/employeContollers");

const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();


// get /
router.get("/",homepage);

// post /employe
router.post("/current",isAuthenticated ,currentEmploye);

//  post /employe/signup
 router.post("/signup",employesignup);

//  post /employe/signin
 router.post("/signin",employesignin);

//  get /employe/signout
 router.get("/signout",isAuthenticated,employesignout);

//  post/employe/send-mail
 router.post("/send-mail",employesendmail);

//  get/employe/forget-link/employe id
 router.get("/forget-link/:id",employeforgetlink);

//  post/employe/reset-password/employe id
 router.post("/reset-password/:id",isAuthenticated,employeresetpassword);

//  post/employe/update/employe id
router.post("/update/:id",isAuthenticated,employeupdate);
//  post/employe/avtar/employe id
 router.post("/companylogo/:id",isAuthenticated,employecompanylogo);


 //----------------internship--------------------
//  post/employe/internship/create
router.post("/internship/create",isAuthenticated,createinternship);

//  post/employe/internship/read--> isme o/p array k form aayigi
router.post("/internship/read",isAuthenticated,readinternship);

//  post/employe/internship/read/:id--> isme o/p object k form aayigi
router.post("/internship/read/:id",isAuthenticated,readsingleinternship);

//----------------job--------------------
//  post/employe/job/create
router.post("/job/create",isAuthenticated,createjob);

//  post/employe/jobs/read--> isme o/p array k form aayigi
router.post("/job/read",isAuthenticated,readjob);

//  post/employe/job/read/:id--> isme o/p object k form aayigi
router.post("/job/read/:id",isAuthenticated,readsinglejob);

module.exports= router; 
