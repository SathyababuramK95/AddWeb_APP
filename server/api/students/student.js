const md5 = require('md5');
const mongoose = require('mongoose');
const Student = require('../../models/student');
const Utils = require('../../utils');
const fs = require('fs');

exports.registerStudent = async(req,res)=>{
    try {
       
        let newStudent = new Student();
        newStudent.firstname = req.body.firstname && req.body.firstname || null;
        newStudent.lastname = req.body.lastname && req.body.lastname || null;
        newStudent.fathername = req.body.fathername && req.body.fathername || null;
        newStudent.emailid = req.body.emailid && req.body.emailid || null;
        newStudent.address = req.body.address && req.body.address || null;
        newStudent.mobilenumber = req.body.mobilenumber && req.body.mobilenumber || null;
        newStudent.gender = req.body.gender && req.body.gender || null;
        newStudent.dateofbirth = req.body.dateofbirth && req.body.dateofbirth || null;
        newStudent.Country = req.body.Country && req.body.Country || null;
        if(req.body.imagePath){
            newStudent.studentimage.data = fs.readFileSync(req.body.imagePath);
            newStudent.studentimage.contentType = fs.readFileSync(req.body.contentType);
        }

        newStudent.save((err,data)=>{
            if (err) {
                Utils.sendFailureResponse({ error : "error while saving student data" },req,res,err);
                return;
            } else {
                Utils.sendSuccessResponse({student : data},res);
                return;
            }
        });
    } catch (err) {
        Utils.sendFailureResponse({ error :err },req,res);
        return;
    }
}


exports.getStudentDetails = async(req,res)=>{
    
    try {

        if(req.body.studentuid){
            let studentData = await Student.findById(mongoose.Types.ObjectId(req.body.studentuid)).exec();

            Utils.sendSuccessResponse({student : studentData},res);
            return;
        }else{
            let studentsData = await Student.find({}).exec();
            Utils.sendSuccessResponse({student : studentsData},res);
            return;
        }
        
    } catch (error) {
        Utils.sendFailureResponse({ error :err },req,res);
        return;
    }
}