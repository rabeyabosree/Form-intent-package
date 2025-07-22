

class RageClickDetector {
    constructor({ threshold = 500, maxClicks = 3 } = {}) {
        this.threshold = threshold;
        this.maxClicks = maxClicks;
        this.clickTimestamps = [];
    }

    registerClick(timestamps = Date.now()) {
        this.clickTimestamps.push(timestamps);
        if (this.clickTimestamps.length > this.maxClicks) {
            this.clickTimestamps.shift();
        }
        this.clickTimestamps = this.clickTimestamps.slice(-this.maxClicks);
    }

    isRageClick() {
        if (this.clickTimestamps.length < this.maxClicks) {
            return false;
        }

        for (let i = 1; i < this.clickTimestamps.length; i++) {
            const diff = this.clickTimestamps[i] - this.clickTimestamps[i - 1];
            if (diff > this.threshold) {
                return false;
            }
        }

        return true;
    }

    reset(){
        this.clickTimestamps = [];
    }

    getMetrics(){
        return {
            isRage : this.isRageClick(),
            totalClicks : this.clickTimestamps.length,
            duration : this.clickTimestamps.length >= 2
                ? this.clickTimestamps[this.clickTimestamps.length - 1] - this.clickTimestamps[0]
                : 0
        }
    }
}


export default RageClickDetector;
