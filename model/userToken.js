const Encrypt = require("../controllers/encrypt");
var split = "_!_";
var expiration = 1000 * 60 * 60;

function UserToken (isNew, token, name, _id, roleNumber) {
    if(isNew) {
        this.name = name;
        this._id = _id;
        this.roleNumber = roleNumber;
        this.expirationTime = Date.now() + expiration;
        this.token = Encrypt.getEncrypt(
            name + split+
            _id + split+
            this.expirationTime + split+
            roleNumber);
    } else {
        
        this.token = token;
        var tokenStr = Encrypt.getDecrypt(token).split(split);
        this.name =  tokenStr[0];
        this._id = tokenStr[1];
        this.expirationTime = tokenStr[2];
        this.roleNumber = tokenStr[3];
    }

    this.isNotExpired = function () {
        if(this.expirationTime && parseInt(this.expirationTime) > Date.now()){
            return true;
        }
        return false;
    }
}

module.exports = UserToken;