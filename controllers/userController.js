const userSchema = require("../model/userSchema");

function userController() {
    function create(req, res) {

        console.log(req.body);
        if (!req.body.name || !req.body.id) {
            return res.status(400).send({})
        }
        var newUser = new userSchema(req.body);
        newUser.save(function (err, newDoc) {
            if (err) {
                console.log(err);
                return res.status(500).send(err)
            }
            res.status(201).send(newDoc);

        })
    }
    function deleteUser(req, res) {
        userSchema.deleteOne({ _id: req.params._id }, function (err, result) {
            if (err) {
                return res.status(500).send();
            }
            if (!result.n) {
                return res.status(404).send();
            }
            return res.status(200).send();
        })
    }
    function updateUser(req, res) {
        userSchema.updateOne({ id: req.params.id }, { $set: req.body }, function (err, result) {
            if (err) {
                return res.status(500).send();
            }
            if (!result.n) {
                return res.status(404).send();
            }
            res.status(200).send(result);
        })
    }
    function getUser(req, res) {
        userSchema.findOne({ _id: req.body._id }, function (err, user) {
            if (err) {
                return res.status(500).send();
            }
            if (!user) {
                return res.status(404).send();
            }
            res.status(200).send(user);
        })
    }
    function getAll(req, res) {
        userSchema.find({ roleNumber: { $lt: 15 } }, function (err, list) {
            if (err) {
                return res.status(500).send({});
            }
            return res.status(200).send(list);
        })
    }

    return { create, deleteUser, updateUser, getUser, getAll }
}
module.exports = userController()