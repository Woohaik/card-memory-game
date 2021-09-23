const timerHtml = document.getElementById('timer');
class Timer {
    constructor() {
        this.recordedTime = 0;
        this.currentInterval;
        this.initialTimerTime = new Date().getTime();
    }

    stop() {
        this.clearCurrentInterval();
        timerHtml.innerHTML = millSecsToSecString(this.recordedTime);
        return this.recordedTime;
    }

    init() {
        this.initialTimerTime = new Date().getTime();
        this.clearCurrentInterval();
        this.update();
        this.currentInterval = setInterval(() => { this.update() }, 1);
    }

    update() {
        const now = new Date();
        const milli = now.getTime() - this.initialTimerTime;
        this.recordedTime = milli;
        timerHtml.innerHTML = millSecsToSecString(milli);
    }

    clearCurrentInterval() {
        clearInterval(this.currentInterval)
        timerHtml.innerHTML = millSecsToSecString(0);
    }
}
