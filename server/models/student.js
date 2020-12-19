const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let StudentSchema = new Schema({
    studentimage: { 
        data: Buffer, 
        contentType: String 
    },
    firstname : {
        type :  String,
        required : true
    },
    lastname : {
        type :  String,
        required : true
    },
    fathername : {
        type :  String,
        required : true
    },
    emailid : {
        type :  String,
        required : true
    },
    address : {
        type :  String,
    },
    mobilenumber : Number,
    gender : String,
    dateofbirth : Number,
    Country  : String,
});


module.exports = mongoose.model('Student', StudentSchema);