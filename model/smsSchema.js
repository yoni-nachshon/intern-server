const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var smsSchema = new Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: Number
    }
    
});
module.exports = mongoose.model("sms", smsSchema);