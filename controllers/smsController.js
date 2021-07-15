const Vonage = require('@vonage/server-sdk');
const code = require('./code');
const UserToken = require('../model/userToken');
const userSchema = require('../model/userSchema');
const smsSchema = require('../model/smsSchema');

var sms;

const vonage = new Vonage({
    apiKey: "4d12ec55",
    apiSecret: "2w9dc2lbeTVU4oOD"
})

function smsController() {

    function sendSmsInternal(req, res) {
        sms = new code();
        mCode = sms.toString();
        var temp = {
            phone: req.body.phone,
            code: mCode
        };

        smsSchema.updateOne({phone: req.body.phone}, temp, {upsert: 1}, (err, result) => {
            if(! err) {
                var from = req.body.from;
                var to = req.body.to;
                var text = req.body.text + ' your code is ' + mCode;
                console.log(text);
                res.status(200).send();                      
            }
        })
    }
    function sendSms(req, res) {

        if(req.body.loginMode) {
            // if user exists send sms
                userSchema.findOne({name: req.body.name,phone: req.body.phone}, function(err, user){
                    if(err){
                        return res.status(500).send();
                    }
                    if(!user){
                        return res.status(404).send();
                    }
                    sendSmsInternal(req, res);
            })
            // else return 400 status
        } else {
            // check if phone number already exists
            sendSmsInternal(req, res);
        }
        
        // return;
        // return because next code is cost money

        vonage.message.sendSms(from, to, text, (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                if (responseData.messages[0]['status'] === "0") {
                    console.log("Message sent successfully.");
                } else {
                    console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                }
            }
        })
    }

    function codecomper(req, res) {
      
        smsSchema.findOne(req.body, function(err, doc) {
            if(doc) {
                userSchema.findOne({phone: req.body.phone}, {password: 0}, function(err, user) {
                    if (user) {
                        var userToken = new UserToken(true,null, user.name, user._id, user.roleNumber);
                        return res.status(200).send( {user: user, token: userToken.token});
                    } else {
                        var userToken = new UserToken(true,null);
                        return res.status(200).send( {token: userToken.token});
                    }
                })                              
            } else {
                res.status(500).send(false);
            }
        });
    }


    return {
        sendSms: sendSms,
        codecomper: codecomper

    }
}

module.exports = smsController();