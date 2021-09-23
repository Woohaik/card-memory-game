const functionalLoop = (number, fn) => {
    number = Math.abs(number);
    number && (fn(number), functionalLoop(--number, fn));
};

const millSecsToSecString = (milli) => {
    const millSecs = milli % 1000;
    return ` ${(milli - millSecs) / 1000} : ${millSecs}`;
};

const randomizeArray = function () {
    const currentArray = this;
    return currentArray.map(value => ({ value, sortValue: Math.random() })).
        sort((a, b) => a.sortValue - b.sortValue).
        map(({ value }) => value);
};

Array.prototype.randomizeArray = randomizeArray;
