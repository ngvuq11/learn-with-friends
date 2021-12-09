Array.prototype.reduce2 = function (callback, result) {
    for (let index = 0; index < this.length; index++) {
        result = callback(result, this[index], index, this);
    }
    return result;
};

const arr = [1, 2, 3, 4];

const res = arr.reduce2((total, value) => {
    return total + value;
}, 0);







