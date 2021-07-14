var Crypto = require("crypto-js");
const Bcrypt = require("bcrypt");

const key = "Avratechjbh8";
function crypto(){

    function cryptPassword(password){
        const hash = Bcrypt.hashSync(password, 10);
        return hash;
    }

    function compare(password, hash) {
        return Bcrypt.compareSync(password, hash);
    }

    function getEncrypt(input) {
        const enc = Crypto.AES.encrypt(input, key);
        return enc.toString();
    }

    function getDecrypt(input) {
        const dec = Crypto.AES.decrypt(input, key);
        return dec.toString(Crypto.enc.Utf8);
    }

    return {
        getEncrypt,
        getDecrypt,
        cryptPassword,
        compare
    }
}

module.exports = crypto();