function code() {

    this.one = get_random();
    this.two = get_random();
    this.three = get_random();
    this.four = get_random();

    this.toString = function () {
        return `${this.one}${this.two}${this.three}${this.four}`;
    }

    function get_random() {
        return Math.floor(Math.random() * 9) + 1;
    }
}

module.exports =  code;