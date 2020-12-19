module.exports = function(router) {
    let User = require('./api/users/user');
    let Student = require('./api/students/student');
    
    //User
    router.post('/users/user/registeruser', User.registerUser);
    router.post('/users/user/loginuser', User.loginUser);


    //Student
    router.post('/students/student/registerstudent', Student.registerStudent);
    router.post('/students/student/getstudentdetail', Student.getStudentDetails);

}