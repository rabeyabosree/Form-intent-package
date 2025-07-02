class HesitationDetector {
    constructor({ threshold = 2000 } = {}) {
        this.threshold = threshold;
        this.focusTime = null;
        this.firstFocus = null;
    }

    onFocus() {
        const timestamp = Date.now();

        if (!this.focusTime) this.focusTime = 0;

        if (!this.firstFocus) {
            this.firstFocus = timestamp;
        } else {
            this.focusTime += timestamp - this.firstFocus;
            this.firstFocus = timestamp;
        }
    }

    onBlur() {
        const timestamp = Date.now();

        if (this.firstFocus) {
            this.focusTime += timestamp - this.firstFocus;
            this.firstFocus = null;
        }
    }

    getDelay() {
        if (!this.firstFocus || this.focusTime === null) {
            return 0;
        }

        const totalTime = Date.now() - this.firstFocus;
        return totalTime - this.focusTime;
    }

    isHesitating() {
        if (!this.firstFocus || this.focusTime === null) {
            return false;
        }

        const delay = this.getDelay();
        return delay >= this.threshold;
    }

    reset() {
        this.firstFocus = null;
        this.focusTime = null;
    }

    getMetrics() {
        return {
            isHesitating: this.isHesitating(),
            focusTime: this.focusTime || 0,
            delay: this.getDelay(),
            totalFocusTime: this.firstFocus ? Date.now() - this.firstFocus : 0
        };
    }
}


export default HesitationDetector;