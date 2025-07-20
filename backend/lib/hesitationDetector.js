class HesitationDetector {
    constructor({ threshold = 2000 } = {}) {
        this.threshold = threshold;
        this.focusTime = null;
        this.firstFocus = null;
        this.firstInputTime = null; // ✅ New
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

    // ✅ New method to register the moment of first actual input
    registerFirstInput() {
        if (!this.firstInputTime) {
            this.firstInputTime = Date.now();
        }
    }

    getDelay() {
        if (this.firstInputTime === null || this.focusTime === null) {
            return 0;
        }

        const delay = this.firstInputTime - this.firstFocus;
        return delay;
    }

    isHesitating() {
        if (this.firstInputTime === null || this.firstFocus === null) {
            return false;
        }

        const delay = this.getDelay();
        return delay >= this.threshold;
    }

    reset() {
        this.firstFocus = null;
        this.focusTime = null;
        this.firstInputTime = null; // ✅ Reset this too
    }

    getMetrics() {
        return {
            isHesitating: this.isHesitating(),
            focusTime: this.focusTime || 0,
            delay: this.getDelay(),
            totalFocusTime: this.firstFocus ? Date.now() - this.firstFocus : 0,
            firstInputTime: this.firstInputTime,
        };
    }
}


export default HesitationDetector