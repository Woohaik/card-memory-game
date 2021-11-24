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


const saveScore = (score) => {
    // SQUEMA:  score.name , score.time, score.fails
    const lastScores = localStorage.getItem("scores");
    if (lastScores) {
        const auxScore = JSON.parse(lastScores);
        const lastIndexWithThisName = auxScore.findIndex(lsc => lsc.name === score.name)
        if (lastIndexWithThisName !== -1) {
            auxScore[lastIndexWithThisName] = score;
        } else {
            auxScore.push(score);
        }
        localStorage.setItem("scores", JSON.stringify(auxScore));
    } else {
        localStorage.setItem("scores", JSON.stringify([score]));
    }
}

const getScores = () => {
    const scores = localStorage.getItem("scores");
    return JSON.parse(scores || "[]");
}

Array.prototype.randomizeArray = randomizeArray;
