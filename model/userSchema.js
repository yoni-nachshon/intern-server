const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {
        type: String,
        required: true   
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    passport: {
        type:String
    },
    phone: {
        type:String,
        required: true       
    },
    img: {
        type: String
    },
    age: {
        type:Number
    },
    country: {
        type:String
    },
    city: {
        type:String
    },
    academicInstitution: {
        type: String
    },
    graduationYear: {
        type: Number
    },
    medicalInstitution: {
        type: String
    },
    residancy: {
        type: String
    },
    department: {
        type: String
    },
    residancyYear: {
        type: Number
    },
    roleNumber: {
        type: Number
    }    
});
module.exports = mongoose.model("user", userSchema);